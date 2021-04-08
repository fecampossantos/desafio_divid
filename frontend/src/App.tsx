import React, {FC, ChangeEvent, useState} from 'react';
import './App.css';
import { RepoModel, RepoInfos } from './Interfaces/interface'
import axios from 'axios'
import Button from './models/Button/Button';
import Header from './models/Header/Header';
import { collapseTextChangeRangesAcrossMultipleVersions, setSourceMapRange } from 'typescript';


const App: FC = () => {
  const [userName, setUserName] = useState<string>('')
  const [reposList, setReposList] = useState<RepoModel[] | null>();
  const [repoInfos, setRepoinfos] = useState<RepoInfos>();
  const [showDiv, setShowDiv] = useState<boolean>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUserName(event.target.value);
  };

  const fetchRepos = (username: string): void => {
    axios
    .post('http://localhost:8000/user/check', {'login': username})
    .then(({data}) => {
      setReposList(data)
      setShowDiv(false)
    })

    setReposList(reposList);
  };

  const fetchInfo = (repo: RepoModel) => {
    const id = repo.repo_id
    axios
    .get('http://localhost:8000/repository/'+id)
    .then(({data}) => {
      setRepoinfos(data[0])
      setShowDiv(true)
    })
  }

  return (
    <div className="App">
      <Header title="GIT REPOS" />

      <div className="container">
        <input className="inp" type='text' placeholder='Enter username' value={userName} onChange={handleChange}></input>

        <button className='button1' onClick={() => {fetchRepos(userName)} }>Fetch Repos!</button>
      </div>
      <div>
        {reposList && <div >
          <ul className="divBorder">
            {reposList?.map((repo: RepoModel, key: number) => {
              return (<li className="elementoLista" key={key} onClick={() => {fetchInfo(repo)}}> {repo.name} </li>)
            })}</ul>
        </div> }

        {showDiv && <div className="divBorder">
        <span className="repoTitle">{repoInfos?.name}</span><br/>
        <a href={repoInfos?.url}>{repoInfos?.full_name}</a><br/>
        <br/>
        <span className="info">Coded in&nbsp;<span className="codeLanguage"> {repoInfos?.languages}</span></span><br/>
        

        </div> }

      </div>
      
    </div>
  );
}

export default App;
