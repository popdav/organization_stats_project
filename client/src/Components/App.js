import React from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Project from './Project';
import axios from 'axios';
import MonthPickerInput  from 'react-month-picker-input';
import 'react-month-picker-input/dist/react-month-picker-input.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshRate: 1000*60,
      organizations: [],
      projects: [],
      selectedOrganization: '',
      projectsType: {all: true, finished: false, unfinished: false},
      projectsSub: {all: true, paid: false, unpaid: false},
      page: 1,
      searchBody: {},
      searchClicked: false,
      avgSmartTag: {},
      processingTime: {},
      projectCount: [],
      projectCountPackage: [],
      totalArea: [],
      inteval: null,
      heartbeat: {live: false},
      monthVal: (new Date()).getMonth(), 
      yearVal: (new Date()).getFullYear()
    }
  }

  refresh = async () => {
    try {

      let res = await axios.post('/projects', this.state.searchBody);
      console.log(res.data);
      let stats = await axios.post('/projectsstats', this.state.searchBody);
      console.log(stats.data);  
      let avg = await axios.post('/smarttag', this.state.searchBody);
      console.log(avg)
      let ptime = await axios.post('/processingtime', this.state.searchBody);
      console.log(ptime)
      let count = await axios.post('/projectcount', this.state.searchBody);
      console.log(count)
      let countPckg = await axios.post('/projectcountpackage', this.state.searchBody);
      console.log(countPckg)
      let area = await axios.post('/totalarea', this.state.searchBody);
      console.log(area)
      
      let heartbeat = await axios.get('/checkworker');
      console.log(heartbeat);

      this.setState({
        projects: res.data,
        searchClicked: true, 
        page: 1,
        avgSmartTag: avg.data[0],
        processingTime: ptime.data[0],
        projectCount: count.data,
        projectCountPackage: countPckg.data,
        totalArea: area.data,
        stats: stats.data,
        heartbeat: heartbeat.data
      });

    }
    catch(err) {
      console.log(err);
    }
  }

  handleSelectOrganization = (e) => {
    this.setState({selectedOrganization: e.target.value !== '' ? JSON.parse(e.target.value) : ''});
  };

  handleSelectProjectType = (e) => {
    let body = {all: false, finished: false, unfinished: false};
    body[e.target.value] = true;
    this.setState({projectsType: body});
  };

  handleSelectProjectSub = (e) => {
    let body = {all: false, paid: false, unpaid: false};
    body[e.target.value] = true;
    this.setState({projectsSub: body});
  };

  handleClickRefresh = async () => {
    if (this.state.inteval === null) {
      alert('You need to search before refreshing');
      return;
    }
    clearInterval(this.state.inteval);
    await this.refresh();
    this.setState({interval: setInterval(this.refresh, this.state.refreshRate)});
  }

  handleClickSearch = async () => {
    clearInterval(this.state.inteval);
    let body = {
      organizationName: this.state.selectedOrganization,
      projectsType: this.state.projectsType,
      projectsSub: this.state.projectsSub,
      page: 1,
      year: this.state.yearVal,
      month: this.state.monthVal
    }

    console.log(body)
    try {

      let res = await axios.post('/projects', body);
      console.log(res);
      let stats = await axios.post('/projectsstats', body);
      console.log(stats);  
      let avg = await axios.post('/smarttag', body);
      console.log(avg)
      let ptime = await axios.post('/processingtime', body);
      console.log(ptime)
      let count = await axios.post('/projectcount', body);
      console.log(count)
      let countPckg = await axios.post('/projectcountpackage', body);
      console.log(countPckg)
      let area = await axios.post('/totalarea', body);
      console.log(area)
      let heartbeat = await axios.get('/checkworker');
      console.log(heartbeat);

      this.setState({
        projects: res.data, 
        searchBody: body, 
        searchClicked: true, 
        page: 1,
        avgSmartTag: avg.data[0],
        processingTime: ptime.data[0],
        projectCount: count.data,
        projectCountPackage: countPckg.data,
        totalArea: area.data,
        heartbeat: heartbeat.data,
        stats: stats.data,
        inteval: setInterval(this.refresh, this.state.refreshRate),
      });

    }
    catch(err) {
      console.log(err);
    }
  };

  handleClickPrevous = async () => {
    if (this.state.page === 1) {
      alert('You are on page 1');
      return;
    }

    let body = {
      organizationName: this.state.selectedOrganization,
      projectsType: this.state.projectsType,
      projectsSub: this.state.projectsSub,
      page: this.state.page-1
    }

    console.log(body)
    try {

      let res = await axios.post('/projects', body);
      console.log(res.data);
      this.setState({
        projects: res.data, 
        searchBody: body, 
        searchClicked: true, 
        page: this.state.page-1
      });
      window.scrollTo(0, 0);
    }
    catch(err) {
      console.log(err);
    }
  }

  handleClickNext = async () => {

    let body = {
      organizationName: this.state.selectedOrganization,
      projectsType: this.state.projectsType,
      projectsSub: this.state.projectsSub,
      page: this.state.page+1
    }

    console.log(body)
    try {

      let res = await axios.post('/projects', body);
      console.log(res.data);
      if(res.data.length === 0) {
        alert('There is no next page');
        return;
      }
      this.setState({
        projects: res.data, 
        searchBody: body, 
        searchClicked: true, 
        page: this.state.page+1
      });
      window.scrollTo(0, 0);

    }
    catch(err) {
      console.log(err);
    }
  }

    componentDidMount = async () => {

    try {

      let res = await axios.get('/organizations');
      console.log(res.data);
      this.setState({organizations: res.data})
      
      this.handleClickSearch();

    }
    catch(err) {
      console.log(err);
    }

  }

  componentWillUnmount = async () => {
    clearInterval(this.state.inteval);
    this.setState({interval: null});
  }

  timeConversion = (millisec) => {

      var seconds = (millisec / 1000).toFixed(1);

      var minutes = (millisec / (1000 * 60)).toFixed(1);

      var hours = (millisec / (1000 * 60 * 60)).toFixed(1);

      var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

      if (seconds < 60) {
          return seconds + " Sec";
      } else if (minutes < 60) {
          return minutes + " Min";
      } else if (hours < 24) {
          return hours + " Hrs";
      } else {
          return days + " Days"
      }
  }

  render() {
    return (
      <div className="container">
        <br/>
        <form style={{marginLeft: "20%", marginRight: "20%"}}>
          <div className="form-group">
            <label htmlFor="organizations">Select organization:</label>
            <select className="form-control" id="organizations" onChange={this.handleSelectOrganization}>
              <option value=''>All</option>
              {this.state.organizations.map((e, i) => {
                return (
                  <option key={i} value={JSON.stringify(e)} >{e.organizationName}</option>
                )
              })}
            </select>
          </div>

          {/* <div className='d-flex justify-content-between'>
            <div className='form-group'>
              <label>Select projects type:</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio"  id="allType" value="all" 
                     checked={this.state.projectsType.all}
                     onChange={this.handleSelectProjectType}/>
              <label className="form-check-label" htmlFor="allType">
                All
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio"  id="finished" value="finished" 
                     checked={this.state.projectsType.finished} 
                     onChange={this.handleSelectProjectType}/>
              <label className="form-check-label" htmlFor="finished">
                Finished projects
              </label>
            </div>
            <div className="form-check disabled">
              <input className="form-check-input" type="radio"  id="unfinished" value="unfinished" 
                     checked={this.state.projectsType.unfinished} 
                     onChange={this.handleSelectProjectType}/>
              <label className="form-check-label" htmlFor="unfinished">
                Unfinished projects
              </label>
            </div>
          </div>

          <div className='d-flex justify-content-between'>
            <div className='form-group'>
              <label>Select projects subscription:</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio"  id="allSub" value="all" 
                     checked={this.state.projectsSub.all}
                     onChange={this.handleSelectProjectSub}/>
              <label className="form-check-label" htmlFor="allSub">
                All
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio"  id="paid" value="paid" 
                     checked={this.state.projectsSub.paid}
                     onChange={this.handleSelectProjectSub}/>
              <label className="form-check-label" htmlFor="paid">
                Paid projects
              </label>
            </div>
            <div className="form-check disabled">
              <input className="form-check-input" type="radio"  id="unpaid" value="unpaid" 
                     checked={this.state.projectsSub.unpaid}
                     onChange={this.handleSelectProjectSub}/>
              <label className="form-check-label" htmlFor="unpaid">
                Unpaid projects
              </label>
            </div>
          </div> */}
          <div className='form-group'>
            <MonthPickerInput
              year={this.state.yearVal}
              month={this.state.monthVal}
              onChange={(maskedValue, selectedYear, selectedMonth) => {
                console.log(maskedValue, selectedYear, selectedMonth);
                this.setState({yearVal: selectedYear, monthVal: selectedMonth});
              }}
            />
          </div>
          <div className='d-flex justify-content-between'>
            <div className='btn btn-primary' onClick={this.handleClickSearch}>Search</div>
            <div className='btn btn-primary' onClick={this.handleClickRefresh}>Refresh</div>
          </div>
        </form>
        <br/>
        <div style={{marginLeft: "20%", marginRight: "20%"}}>
        {this.state.searchClicked && !this.state.heartbeat.live ? (
          <div className="alert alert-danger" role="alert">
            Worker is down!
          </div>)
          : ''
          }
        {this.state.searchClicked ? (
          <div className='card'>
            <div>Page: {this.state.page}</div>
            <div>Project count: {this.state.stats.all}</div>
            <div>Project count per page: {this.state.projects.length}</div>
            <div>Deleted projects: {this.state.stats.deleted}</div>
            <div>Completed projects: {this.state.stats.finished}</div>
            <div>Not completed projects: {this.state.stats.unfinished}</div>
            <div>Paid projects: {this.state.stats.paid}</div>
            <div>Unpaid projects: {this.state.stats.unpaid}</div>
            <div>Average count of smartTags per project: {this.state.avgSmartTag ? this.state.avgSmartTag.avgSmartTag.toFixed(3) : 0}</div>
            <div>Average project processing time: {this.state.processingTime ? this.timeConversion(this.state.processingTime.avgProcessingTIme) : 0}</div>
            <br />
            <div>Project count for each scanner:</div>
            <select multiple disabled className="form-control" id="exampleFormControlSelect2">
              {this.state.projectCount.map((e, i) => {
                return (
                <option key={i}>scanner id: {e._id === null ? 'None' : e._id}, count: {e.count}</option>
                )
              })}
            </select>
            <br />
            <div>Total area scanned by the organization:</div>
            <select multiple disabled className="form-control" id="exampleFormControlSelect2">
              {this.state.totalArea.map((e, i) => {
                return (
                <option key={i}>organization id: {e._id === null ? 'None' : e._id}, count: {e.count.toFixed(3)}</option>
                )
              })}
            </select>
            <br />
            <div>Project count for each package:</div>
            <select multiple disabled className="form-control" id="exampleFormControlSelect2">
              {this.state.projectCountPackage.map((e, i) => {
                return (
                <option key={i}>package: {e._id === null ? 'None' : e._id}, count: {e.count}</option>
                )
              })}
            </select>
            <br />
          </div>
        ) : ''}
        <br />
        {this.state.projects.map((e, i) => {
          return (
            <div key={e._id}>
              <Project  element={e}/>
              <br/>
            </div>
          )
        })}

        {this.state.searchClicked ? (<nav>
          <ul className="pagination">
            <li className="page-item" onClick={this.handleClickPrevous}><div className="page-link">Previous</div></li>
            <li className="page-item" onClick={this.handleClickNext}><div className="page-link">Next</div></li>
          </ul>
        </nav>) : ''}

        </div>

      </div>
    )
  }
}

export default App;
