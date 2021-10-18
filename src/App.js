import React, { useState } from 'react';
import { ResponsivePie } from '@nivo/pie'
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';
import Select from 'react-select';

function App() {

  const [columns, setColumns] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [titleColumns, setTitleColumns] = useState([]);
  const [titleData, setTitleData] = useState([]);
  const [severityColumns, setSeverityColumns] = useState([]);
  const [severityData, setSeverityData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({});
  const [filterSelections, setFilterSelections] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [searchArray, setSearchArray] = useState({});


  const processData = dataString => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

    const data = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      if (headers && row.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] === '"')
              d = d.substring(1, d.length - 1);
            if (d[d.length - 1] === '"')
              d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter(x => x).length > 0) {
          data.push(obj);
        }
      }
    }

    const filters = {};
    for (let h = 0; h < headers.length; h++) {
      const header = headers[h];
      filters[header] = Array.from(new Set(data.map(finding => finding[header])));
      searchArray[header] = [""];
    }
    searchArray['Search'] = [""];
    const filterOptions = {};
    for (let f in filters) {
      filterOptions[f] = filters[f].map(x => {
        return {label: x, value: x}
      });
    }

    // prepare columns list from headers
    const columns = headers.map(c => ({
      name: c,
      selector: c,
    }));

    const titleColumns = [
      {
        name: 'Title',
        selector: 'id',
        sortable: true,
        width: '80%'
      },
      {
        name: '# resources affected',
        selector: 'value',
        sortable: true,
      },
    ];

    const severityColumns = [
      {
        name: 'Severity',
        selector: 'id',
        sortable: true,
      },
      {
        name: '# resources affected',
        selector: 'value',
        sortable: true,
      },
    ];
    setData(data);
    setSearchArray(searchArray);
    setHeaders(headers);
    setColumns(columns);
    setTitleColumns(titleColumns);
    setSeverityColumns(severityColumns);
    setFilterOptions(filterOptions);
    processFilteredData(data);
  }


  const handleFileUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
    };
    reader.readAsBinaryString(file);
  }


  const handleFilters = (e,o) => {
    const name = o ? o.name : e.target.name;
    const vals = o ? e : [e.target];
    searchArray[name] = vals.map(v => v.value);
    filterSelections[name] = vals;
    setFilterSelections(filterSelections);
    setSearchArray(searchArray);
    searchData();
  }

  const handleSuppressed = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    searchArray[name] = filterOptions[name].map(v => v.value);
    if (checked) {
      searchArray[name] = searchArray[name].filter(function(item) {
        return item !== "SUPPRESSED";
      })
    }
    setSearchArray(searchArray);
    searchData();
  }

  const searchData = () => {
    let filteredData = data;
    let firstFilter = false;
    for (let h = 0; h < headers.length; h++) {
      const field = headers[h];
      let filteredDataThisField = [];
      for (let v = 0; v < searchArray[field].length; v++) {
        const value = searchArray[field][v].toLowerCase();
        if (!value) continue;
        firstFilter = true;
        const results = filteredData.filter(d => d[field].toLowerCase().includes(value));
        filteredDataThisField = filteredDataThisField.concat(results);
      }
      if (firstFilter) {
        firstFilter = false;
        filteredData = filteredDataThisField;
      } else {
        filteredData = filteredData.concat(filteredDataThisField);
      }
    }
    processFilteredData(filteredData);
  }


  const processFilteredData = (filteredData) => {
    const searchValue = searchArray['Search'][0].toLowerCase();
    if (searchValue) {
      let searchedData = [];
      for (let h = 0; h < headers.length; h++) {
        const field = headers[h];
        let filteredDataThisField = filteredData.filter(d => d[field].toLowerCase().includes(searchValue));
        searchedData = searchedData.concat(filteredDataThisField);
      }
      filteredData = searchedData;
    }
    setFilteredData(filteredData);

    const titleData = Object.values(filteredData.reduce((allData, row) => {
      const title = row.Title;
      if(!allData[title]) {
        allData[title] = {id: title, value: 1};
      } else {
        allData[title].value += 1;
      }
      return allData;
    }, {}));
    setTitleData(titleData);

    const severityData = Object.values(filteredData.reduce((allData, row) => {
      const label = row['Severity Label'];
      if(!allData[label]) {
        allData[label] = {id: label, value: 1};
      } else {
        allData[label].value += 1;
      }
      return allData;
    }, {}));
    setSeverityData(severityData);
  }


  const MyResponsivePie = () => (
    <ResponsivePie
      data={severityData}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      // colors={{ scheme: 'yellow_orange_red' }}
      colors={(d) => {
        switch(d.id) {
          case 'INFORMATIONAL': return '#fffff0';
          case 'LOW': return '#ffffcc';
          case 'MEDIUM': return '#ffeda0';
          case 'HIGH': return '#fed976';
          case 'CRITICAL': return '#feb24c';
          default:
        }
      }}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
      enableArcLinkLabels={false}
      className="pie"
    />
  );


  const TitleTable = () => {
    return (
      <DataTable
        pagination
        highlightOnHover
        columns={titleColumns}
        data={titleData}
        defaultSortAsc={false}
        defaultSortField={"value"}
        className="datatable"
        title="Findings by title"
      />
    );
  };


  const SeverityTable = () => {
    return (
      <DataTable
        pagination
        highlightOnHover
        columns={severityColumns}
        data={severityData}
        defaultSortAsc={false}
        defaultSortField={"value"}
        className="datatable"
        title="Findings by severity"
        conditionalRowStyles={conditionalRowStyles}
      />
    );
  };

  const conditionalRowStyles = [
    {
      when: row => row.id === 'LOW',
      style: {
        backgroundColor: '#ffffcc'
      }
    },
    {
      when: row => row.id === 'MEDIUM',
      style: {
        backgroundColor: '#ffeda0'
      }
    },
    {
      when: row => row.id === 'HIGH',
      style: {
        backgroundColor: '#fed976'
      }
    },
    {
      when: row => row.id === 'CRITICAL',
      style: {
        backgroundColor: '#feb24c'
      }
    },
  ];


  const FullTable = () => {
    return (
      <DataTable
        pagination
        highlightOnHover
        columns={columns}
        data={filteredData}
        className="datatable"
        title="All findings"
      />
    );
  };

  const Filter = ({name}) => {
    return (
      <div className="field onequarter">
        <label htmlFor={name}>{name}:</label>
        <Select
          isMulti
          name={name}
          options={filterOptions[name]}
          className="basic-multi-select"
          classNamePrefix="select"
          value={filterSelections[name]}
          onChange={handleFilters}
        />
      </div>
    );
  };


  return (
    <div>
      <form id="form">
        <div className="field onequarter">
          <label htmlFor="File">File:</label>
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileUpload}
            required
            name="File"
          />
        </div>
        <div className="field onequarter">
          <label htmlFor="Search">Search:</label>
          <input
            type="search"
            name="Search"
            placeholder="Type to filter all fields"
            onChange={handleFilters}
          />
        </div>
        <Filter name="Team"/>
        <Filter name="AWS Account ID"/>
        <Filter name="Compliance Status"/>
        <Filter name="Severity Label"/>
        <Filter name="Resource Type"/>
        <Filter name="Record State"/>
        <div className="field onequarter">
          <input id="hideSuppressed" name="Workflow Status" type="checkbox" onChange={handleSuppressed} />
          <label htmlFor="hideSuppressed">Hide SUPPRESSED items</label>
        </div>
        <button type="reset">Reset</button>
      </form>

      <div className="half">
        <TitleTable/>
      </div>

      <div className="twosixths">
        <SeverityTable/>
      </div>
      <div className="onesixth pie" style={{ height: 300}}>
        <MyResponsivePie/>
      </div>

      <div className="full">
        <FullTable/>
      </div>
    </div>
  );
}

export default App;
