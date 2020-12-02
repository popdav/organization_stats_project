import React from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Project from './Project';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizations: [],
      projects: [],
      selectedOrganization: '',
      projectsType: {all: true, finished: false, unfinished: false},
      projectsSub: {all: true, paid: false, unpaid: false},
      page: 1,
      searchBody: {},
      searchClicked: false,
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

  handleClickSearch = async () => {
    
    let body = {
      organizationName: this.state.selectedOrganization,
      projectsType: this.state.projectsType,
      projectsSub: this.state.projectsSub,
      page: 1
    }

    console.log(body)
    try {

      let res = await axios.post('/projects', body);
      console.log(res.data); 
      this.setState({projects: res.data, searchBody: body, searchClicked: true, page: 1})
      let avg = await axios.post('/smarttag', body);
      console.log(avg)

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

  async componentDidMount() {

    try {

      let res = await axios.get('/organizations');
      console.log(res.data);
      this.setState({organizations: res.data})

    }
    catch(err) {
      console.log(err);
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
              <option value=''></option>
              {this.state.organizations.map((e, i) => {
                return (
                  <option key={i} value={JSON.stringify(e)} >{e.organizationName}</option>
                )
              })}
            </select>
          </div>

          <div className='d-flex justify-content-between'>
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
          </div>

          <div className='btn btn-primary' onClick={this.handleClickSearch}>Search</div>

        </form>
        <br/>
        <div style={{marginLeft: "20%", marginRight: "20%"}}>
        {this.state.searchClicked ? (
          <div>
            <div>Page: {this.state.page}</div>
            <div>Project count: {this.state.projects.length}</div>
            <div>Projects:</div>
          </div>
        ) : ''}
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
