import { useEffect, useState } from 'react';
import './App.css';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import awsConfig from './aws-exports';
import { listLists } from './graphql/queries';

Amplify.configure(awsConfig);

function App() {
  const [list, setList] = useState([]);
  async function fetchList() {
    const { data } = await API.graphql(graphqlOperation(listLists));
    setList(data.listLists.items);
    console.log(data);
  }
  useEffect(async () => {
    try {
      const data = await Auth.currentSession();
      if (data) {
        await fetchList();
      }
    } catch (e) {
    }
  }, []);
  return (
    <AmplifyAuthenticator>
      <div className="App">
        <h1>Welcome to Amplify</h1>
        <ul>
          {list.map(item => <li>{item.title}</li>)}
        </ul>
        <AmplifySignOut />
      </div>
    </AmplifyAuthenticator>
  );
}

export default App;
