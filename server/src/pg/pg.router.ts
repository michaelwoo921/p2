import { Pool } from 'pg';
// We shouldn't use Client because it creates a connection not in the pool.
// We'll probably have to use client in AWS Lambda, though.

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();


// Creating a connection pool of pg Clients
// new Pool() will retrieve environment variables
const pool = new Pool();


function login(user: string, pass: string, cb: Function) {
  const q = `select * from user_account where username=$1::text and password=$2::text`;
  const args = [user, pass];
  cb(q, args);

}

router.get('/user/', function(req: any, res: any, next: Function){
  
  // login(username, password, async (q: string, args: string[] )=>{
    
  //   const resp = await pool.query(q, args);
  //   console.log(resp.rows, 'from aws pg');
  //   res.send(JSON.stringify(resp.rows) + 'from pg user_account table');
  // });
  res.send('user must be logged in from dydb and user_data will be displayed');

})


function songs(cb: Function){
  const q = `select * from song`;
  cb(q);
}

router.get('/songs', function(req: any, res: any){
    
  songs( async (q: string) => {
    const resp = await pool.query(q);
    console.log(resp.rows[0]);

    res.send(resp.rows);
  
  });
})



const getSongById = (song_id: number, cb: Function) => {
  const q = `select * from song where song_id=$1::integer`;
  const args = [song_id];
  cb(q, args);

}


router.get('/songs/:song_id',  function(req: any, res: any, next: Function){
  
  const song_id = Number(req.params.song_id);
  console.log(song_id);
  getSongById(song_id, async (q: string, args: string[] )=>{
    
    const resp = await pool.query(q, args);

    console.log(resp.rows, 'from pg playlist table');
  
    res.send(JSON.stringify(resp.rows[0]));
  });
 
})
 


function quit() {
    // The app is closing, shut down the connections. when should we terminate connection?
    pool.end();
    process.exit();
}



export default router;