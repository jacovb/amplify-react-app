import logo from "./logo.svg";
import "./App.css";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from "./aws-exports";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import { listSongs } from './graphql/queries';
import { useEffect, useState } from "react";

Amplify.configure(awsconfig);

function App() {
  const [songs, setSongs] = useState([])

  useEffect(() => {
    fetchSongs()
  }, [])

  const fetchSongs = async () => {
    try {
      const songData = await API.graphql(graphqlOperation(listSongs))
      const songList = songData.data.listSongs.items;
      console.log('song list', songList)
      setSongs(songList)
    } catch (error) {
      console.log('error on fetching songs', error)
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <AmplifySignOut />
        <h2>My App Content</h2>
        {/* this is where react router or other single page app content could go */}
      </header>
    </div>
  );
}

export default withAuthenticator(App);

// GraphQL endpoint: https://l5itl3flpve4zic4ajk6hn7r4a.appsync-api.eu-west-2.amazonaws.com/graphql
