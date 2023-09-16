const express = require('express');
const app = express();
const oracledb = require('oracledb');
const multer = require("multer");
const path = require("path");
oracledb.autoCommit = true;
const cors = require("cors");
const { param } = require('express/lib/request');
app.use(cors())
// Configure server
const port = 3000;
// Define API route to fetch data
app.get('/memes/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`SELECT PI.POST_ID,UI.PROFILE_PICTURE,PI.POST_TIME,PI.MEME,PI.CONTEST_ID,PI.COMMUNITY_ID,PI.DESCRIPTION,UP_VOTE_COUNT(PI.POST_ID) AS UP_VOTES,UI.NAME,UI.USER_ID FROM FOLLOW F JOIN POST_INFO PI ON (F.FIGURE = PI.AUTHOR_ID) JOIN USER_INFO UI ON (PI.AUTHOR_ID = UI.USER_ID) WHERE F.FOLLOWER = ${userId} ORDER BY PI.POST_TIME DESC`);
        const send = result.rows.map((item)=>{
            return {
                id:item[0],
                user_src:item[1],
                user_name:item[8],
                caption:item[6],
                image:item[3],
                upvote:item[7],
                user_id:item[9],
                post_time:item[2]
            }
        })
        res.send(send);
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/templates', async (req, res) => {
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute('SELECT * FROM TEMPLATES_INFO');
        const send = result.rows.map((item)=>{
            return {
                id:item[0],
                image:item[1],
            }
        })
        res.send(send);
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/contests/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`SELECT P.POST_ID, U.PROFILE_PICTURE,P.POST_TIME,P.MEME,P.CONTEST_ID,P.COMMUNITY_ID,P.DESCRIPTION,UP_VOTE_COUNT(P.POST_ID) AS UP_VOTES,U.NAME,U.USER_ID FROM POST_INFO P JOIN USER_INFO U ON (P.AUTHOR_ID = U.USER_ID) WHERE P.CONTEST_ID = ${id} ORDER BY P.POST_TIME DESC`);
        const send = result.rows.map((item)=>{
            return {
                id:item[0],
                user_src:item[1],
                user_name:item[8],
                caption:item[6],
                image:item[3],
                upvote:item[7],
                user_id:item[9],
            }
        })
        res.send(send);
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/community/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`SELECT P.POST_ID, U.PROFILE_PICTURE,P.POST_TIME,P.MEME,P.CONTEST_ID,P.COMMUNITY_ID,P.DESCRIPTION,UP_VOTE_COUNT(P.POST_ID) AS UP_VOTES,U.NAME,U.USER_ID FROM POST_INFO P JOIN USER_INFO U ON (P.AUTHOR_ID = U.USER_ID) WHERE P.COMMUNITY_ID = ${id} ORDER BY P.POST_TIME DESC`);
        const send = result.rows.map((item)=>{
            return {
                id:item[0],
                user_src:item[1],
                user_name:item[8],
                caption:item[6],
                image:item[3],
                upvote:item[7],
                user_id:item[9],
            }
        })
        res.send(send);
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/memeinfo/:memeId', async (req, res) => {
    const id = req.params.memeId;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`SELECT P.MEME,P.DESCRIPTION,U.NAME,U.PROFILE_PICTURE FROM POST_INFO P JOIN USER_INFO U ON (P.AUTHOR_ID = U.USER_ID) WHERE POST_ID = ${id}`);
        const send = result.rows.map((item)=>{
            return {
                imageUrl:item[0],
                caption:item[1],
                user_name:item[2],
                user_src:item[3],
            }
        })
        res.send(send);
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/memecomment/:memeId', async (req, res) => {
    const id = req.params.memeId;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`SELECT A.DESCRIPTION,A.TIME,U.NAME,U.PROFILE_PICTURE,A.COMMENT_ID FROM ACTIVITIES A JOIN USER_INFO U ON (A.AUTHOR_ID = U.USER_ID) WHERE A.POST_ID =  ${id}`);
        const send = result.rows.map((item)=>{
            return {
                username:item[2],
                comment:item[0],
                profile:item[3],
                id:item[4],
            }
        })
        res.send(send);
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/contests', async (req, res) => {
    const id = req.params.memeId;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute("SELECT * FROM CONTEST_INFO CI JOIN SPONSER_INFO SI ON (CI.SPONSER_ID = SI.SPONSER_ID) JOIN USER_INFO UI ON (CI.HOST_ID = UI.USER_ID)");
        const send = result.rows.map((item)=>{
            return {
                contest_id:item[0],
                contest_name:item[2],
                prize_money:item[4],
                start_time:item[5],
                end_time:item[6],
                reg_fee:item[7],
                sponsor_name:item[9],
                sponsor_image:item[10],
                user:item[15],
                user_pic:item[16],
                host_id:item[1],
            }
        })
        res.send(send);
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/contests/rank/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`SELECT DISTINCT UI.NAME,UI.PROFILE_PICTURE, MEMER_ID, UPVOTE_COUNT(UI.USER_ID,${id}) AS TOTAL_UPVOTES, POST_COUNT(UI.USER_ID,${id}) AS TOTAL_POSTS,COMMENT_COUNT(UI.USER_ID,${id}) AS TOTAL_COMMENTS, SCORING(UI.USER_ID,${id}) AS SCORE FROM CONTEST_REGISTRATION CR JOIN USER_INFO UI ON (MEMER_ID = UI.USER_ID) WHERE CR.CONTEST_ID = ${id} ORDER BY SCORE DESC,TOTAL_UPVOTES DESC`);
        const send = result.rows.map((item)=>{
            return {
                user_name:item[0],
                user_src:item[1],
                memer_id:item[2],
                upvote_count:item[3],
                post_count:item[4],
                comment_count:item[5],
                scoring:item[6],
            }
        })
        res.send(send);
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/community/member/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`SELECT UI.NAME,UI.PROFILE_PICTURE FROM USER_INFO UI JOIN COMMUNITY C ON (UI.USER_ID = C.MEMBER_ID) WHERE C.COMMUNITY_ID = ${id}`);
        const send = result.rows.map((item)=>{
            return {
                user_name:item[0],
                user_src:item[1],
            }
        })
        res.send(send);
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/community', async (req, res) => {
    const id = req.params.memeId;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute("SELECT CI.COMMUNITY_ID,CI.NAME,CI.COMMUNITY_IMAGE,UI.NAME,UI.PROFILE_PICTURE,CI.ADMIN_ID FROM COMMUNITY_INFO CI JOIN USER_INFO UI ON (CI.ADMIN_ID = UI.USER_ID)");
        const send = result.rows.map((item)=>{
            return {
                community_id:item[0],
                community_name:item[1],
                community_image:item[2],
                admin_name:item[3],
                admin_image:item[4],
                admin_id:item[5],
            }
        })
        res.send(send);
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/login/:email/:pass', async (req, res) => {
    email = req.params.email;
    pass = req.params.pass;
    const id = req.params.memeId;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`SELECT * FROM USER_INFO WHERE USER_ID = LOG_IN('${email}','${pass}')`);
        const send = result.rows.map((item)=>{
            return {
                user_id : item[0],
            }
        })
        res.send(send);
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/profilepicture/:id', async (req, res) => {
   const id = req.params.id;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`SELECT PROFILE_PICTURE FROM USER_INFO WHERE USER_ID = ${id}`);
        const send = result.rows.map((item)=>{
            return {
                user_image : item[0],
            }
        })
        res.send(send);
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/userposts/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`SELECT P.POST_ID, U.PROFILE_PICTURE,P.POST_TIME,P.MEME,P.CONTEST_ID,P.COMMUNITY_ID,P.DESCRIPTION,UP_VOTE_COUNT(P.POST_ID) AS UP_VOTES,U.NAME,U.USER_ID FROM POST_INFO P JOIN USER_INFO U ON (P.AUTHOR_ID = U.USER_ID) WHERE U.USER_ID = ${id} ORDER BY P.POST_TIME DESC`);
        const send = result.rows.map((item)=>{
            return {
                id:item[0],
                user_src:item[1],
                user_name:item[8],
                caption:item[6],
                image:item[3],
                upvote:item[7],
                user_id:item[9],
            }
        })
        res.send(send);
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/userfollowing/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`SELECT F.FIGURE,U.NAME, U.PROFILE_PICTURE FROM FOLLOW F JOIN USER_INFO U ON (F.FIGURE = U.USER_ID) WHERE F.FOLLOWER = ${id}`);
        const send = result.rows.map((item)=>{
            return {
                following_id:item[0],
                following_name:item[1],
                following_image:item[2],
            }
        })
        res.send(send);
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/userfollowers/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`SELECT F.FOLLOWER,U.NAME, U.PROFILE_PICTURE FROM FOLLOW F JOIN USER_INFO U ON (F.FOLLOWER = U.USER_ID) WHERE F.FIGURE = ${id}`);
        const send = result.rows.map((item)=>{
            return {
                follower_id:item[0],
                follower_name:item[1],
                follower_image:item[2],
            }
        })
        res.send(send);
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/userinfo/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`SELECT U.NAME, U.PROFILE_PICTURE,U.DESCRIPTION,U.EARNED_MONEY FROM USER_INFO U WHERE U.USER_ID = ${id}`);
        const send = result.rows.map((item)=>{
            return {
                user_name:item[0],
                user_image:item[1],
                user_bio:item[2],
                user_money:item[3],
            }
        })
        res.send(send);
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/isliked/:post/:user', async (req, res) => {
    post = req.params.post;
    user = req.params.user;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`SELECT * FROM UP_VOTE WHERE UP_VOTE.AUTHOR_ID = ${user} AND UP_VOTE.POST_ID = ${post}`);
        
        res.send({isliked:result.rows.length});
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/upvote/:post/:user', async (req, res) => {
    post = req.params.post;
    user = req.params.user;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`INSERT INTO Up_Vote VALUES(${post},${user})`);
        console.log(result);
        res.send({isSuccessUp:true});
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/downvote/:post/:user', async (req, res) => {
    post = req.params.post;
    user = req.params.user;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`DELETE FROM UP_VOTE WHERE UP_VOTE.AUTHOR_ID = ${user} AND UP_VOTE.POST_ID = ${post}`);
        console.log(result);
        res.send({isSuccessDown:result.rowsAffected});
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/postcomment/:postId/:userId/:comment', async (req, res) => {
    try {
      const postId = req.params.postId;
        const userId = req.params.userId;

        const comment = req.params.comment;
      const connection = await oracledb.getConnection({
        user: 'MEMESHUB',
        password: 'LetsCode',
        connectString: 'localhost:1521/orcl'
      });
      console.log(postId,userId,comment);
      // Assuming you have a COMMENTS table with appropriate columns
      const result = await connection.execute(
       `INSERT INTO ACTIVITIES VALUES(GET_NEXT_VALID_ID('COMMENT_ID'),${postId},${userId},SYSDATE,'${comment}')`
      );
  
      console.log(result);
      res.json({ isSuccess: true });
      await connection.close();
    } catch (error) {
      console.error('Error posting comment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.get('/updatecomment/:commentId/:comment', async (req, res) => {
    try {
      const commentId = req.params.commentId;
        const comment = req.params.comment;
      const connection = await oracledb.getConnection({
        user: 'MEMESHUB',
        password: 'LetsCode',
        connectString: 'localhost:1521/orcl'
      });
      // Assuming you have a COMMENTS table with appropriate columns
      const result = await connection.execute(
       `UPDATE ACTIVITIES SET DESCRIPTION = '${comment}' WHERE COMMENT_ID = ${commentId}`
      );
  
      console.log(result);
      res.json({ isSuccess: true });
      await connection.close();
    } catch (error) {
      console.error('Error posting comment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.get('/updatecaption/:postId/:comment', async (req, res) => {
    try {
      const postId = req.params.postId;
        const comment = req.params.comment;
      const connection = await oracledb.getConnection({
        user: 'MEMESHUB',
        password: 'LetsCode',
        connectString: 'localhost:1521/orcl'
      });
      // Assuming you have a COMMENTS table with appropriate columns
      const result = await connection.execute(
       `UPDATE POST_INFO SET DESCRIPTION = '${comment}' WHERE POST_ID = ${postId}`
      );
  
      console.log(result);
      res.json({ isSuccess: true });
      await connection.close();
    } catch (error) {
      console.error('Error posting comment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.get('/deletecomment/:commentId', async (req, res) => {
    try {
      const commentId = req.params.commentId;
      const connection = await oracledb.getConnection({
        user: 'MEMESHUB',
        password: 'LetsCode',
        connectString: 'localhost:1521/orcl'
      });
      // Assuming you have a COMMENTS table with appropriate columns
      const result = await connection.execute(
       `DELETE FROM ACTIVITIES WHERE COMMENT_ID = ${commentId}`
      );
  
      console.log(result);
      res.json({ isSuccess: true });
      await connection.close();
    } catch (error) {
      console.error('Error posting comment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.get('/deletecontest/:contestId', async (req, res) => {
    try {
      const contestId = req.params.contestId;
      const connection = await oracledb.getConnection({
        user: 'MEMESHUB',
        password: 'LetsCode',
        connectString: 'localhost:1521/orcl'
      });
      // Assuming you have a COMMENTS table with appropriate columns
      const result = await connection.execute(
       `DELETE FROM CONTEST_INFO WHERE CONTEST_ID = ${contestId}`
      );
  
      console.log(result);
      res.json({ isSuccess: true });
      await connection.close();
    } catch (error) {
      console.error('Error posting comment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.get('/deletecommunity/:communityId', async (req, res) => {
    try {
      const communityId = req.params.communityId;
      const connection = await oracledb.getConnection({
        user: 'MEMESHUB',
        password: 'LetsCode',
        connectString: 'localhost:1521/orcl'
      });
      // Assuming you have a COMMENTS table with appropriate columns
      const result = await connection.execute(
       `DELETE FROM COMMUNITY_INFO WHERE COMMUNITY_ID = ${communityId}`
      );
  
      console.log(result);
      res.json({ isSuccess: true });
      await connection.close();
    } catch (error) {
      console.error('Error posting comment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/isfollowing/:visiting/:user', async (req, res) => {
    visiting = req.params.visiting;
    user = req.params.user;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`SELECT * FROM FOLLOW WHERE FIGURE = ${visiting} AND FOLLOWER = ${user}`);
        
        res.send({isfollowing:result.rows.length});
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/unfollow/:visiting/:user', async (req, res) => {
    visiting = req.params.visiting;
    user = req.params.user;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`DELETE FROM FOLLOW WHERE FIGURE = ${visiting} AND FOLLOWER = ${user}`);
        
        res.send({isSuccess:result.rowsAffected});
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/follow/:visiting/:user', async (req, res) => {
    visiting = req.params.visiting;
    user = req.params.user;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`INSERT INTO FOLLOW VALUES(${visiting},${user})`);
        
        res.send({isSuccess:result.rowsAffected});
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/uploadmeme/:caption/:image/:user', async (req, res) => {
    caption = req.params.caption;
    image = req.params.image;
    user = req.params.user;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`INSERT INTO POST_INFO VALUES (GET_NEXT_VALID_ID('POST_ID'),NULL,NULL,${user},'${caption}',NULL,'${image}',SYSDATE)`);
        
        res.send({isSuccess:result.rowsAffected});
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/uploadmemecommunity/:caption/:image/:user/:communityId', async (req, res) => {
    caption = req.params.caption;
    image = req.params.image;
    user = req.params.user;
    communityId = req.params.communityId;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`INSERT INTO POST_INFO VALUES (GET_NEXT_VALID_ID('POST_ID'),${communityId},NULL,${user},'${caption}',NULL,'${image}',SYSDATE)`);
        
        res.send({isSuccess:result.rowsAffected});
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/uploadmemecontest/:caption/:image/:user/:communityId', async (req, res) => {
    caption = req.params.caption;
    image = req.params.image;
    user = req.params.user;
    communityId = req.params.communityId;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`INSERT INTO POST_INFO VALUES (GET_NEXT_VALID_ID('POST_ID'),NULL,${communityId},${user},'${caption}',NULL,'${image}',SYSDATE)`);
        
        res.send({isSuccess:result.rowsAffected});
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/uploadtemp/:image/:user', async (req, res) => {
    image = req.params.image;
    user = req.params.user;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`INSERT INTO Templates_Info VALUES(GET_NEXT_VALID_ID('TEMPLATE_ID'),'${image}',${user})`);
        
        res.send({isSuccess:result.rowsAffected});
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/sponsors', async (req, res) => {
    visiting = req.params.visiting;
    user = req.params.user;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`SELECT * FROM SPONSER_INFO`);
        const send = result.rows.map((item)=>{
            return{
            id:item[0],
            name:item[1],
            }
        })
        res.send(send);
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/insertcontest/:hostId/:name/:sponsorId/:prizeMoney/:duration/:regFee', async (req, res) => {
    const hostId = req.params.hostId;
    const name = req.params.name;
    const sponsorId = req.params.sponsorId;
    const prizeMoney = req.params.prizeMoney;
    const duration = req.params.duration;
    const regFee = req.params.regFee;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`INSERT INTO CONTEST_INFO VALUES (GET_NEXT_VALID_ID('CONTEST_ID'),${hostId},'${name}',${sponsorId},${prizeMoney},SYSDATE,SYSDATE+${duration},${regFee})`);
        
        res.send({isSuccess:result.rowsAffected});
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/createcommunity/:name/:adminId/:image', async (req, res) => {
    const name = req.params.name;
    const image = req.params.image;
    const adminId = req.params.adminId;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`INSERT INTO COMMUNITY_INFO VALUES(GET_NEXT_VALID_ID('COMMUNITY_ID'),'${name}',${adminId},'${image}')`);
        
        res.send({isSuccess:result.rowsAffected});
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/createsponsor/:name/:image', async (req, res) => {
    const name = req.params.name;
    const image = req.params.image;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`INSERT INTO SPONSER_INFO VALUES(GET_NEXT_VALID_ID('SPONSER_ID'),'${name}','${image}',NULL)`);
        
        res.send({isSuccess:result.rowsAffected});
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/searchprofile/:text', async (req, res) => {
    const text = req.params.text;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`SELECT U.USER_ID,U.NAME,U.PROFILE_PICTURE FROM USER_INFO U WHERE UTL_MATCH.EDIT_DISTANCE(U.NAME, '${text}') <= 3 ORDER BY UTL_MATCH.EDIT_DISTANCE(U.NAME, '${text}') ASC`);
        const send =  result.rows.map((item)=>{
            return{
                id:item[0],
                name:item[1],
                image:item[2],
            }
        })
        res.send(send);
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/searchcontest/:text', async (req, res) => {
    const text = req.params.text;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`SELECT CI.CONTEST_ID,CI.CONTEST_NAME,SI.WALPAPER FROM CONTEST_INFO CI JOIN SPONSER_INFO SI ON (CI.SPONSER_ID = SI.SPONSER_ID) WHERE UTL_MATCH.EDIT_DISTANCE(CI.CONTEST_NAME, '${text}') <= 4`);
        const send =  result.rows.map((item)=>{
            return{
                id:item[0],
                name:item[1],
                image:item[2],
            }
        })
        res.send(send);
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/searchcommunity/:text', async (req, res) => {
    const text = req.params.text;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`SELECT CI.COMMUNITY_ID,CI.NAME,CI.COMMUNITY_IMAGE FROM COMMUNITY_INFO CI WHERE UTL_MATCH.EDIT_DISTANCE(CI.NAME, '${text}') <= 4`);
        const send =  result.rows.map((item)=>{
            return{
                id:item[0],
                name:item[1],
                image:item[2],
            }
        })
        res.send(send);
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/userinfoforedit/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`SELECT UI.NAME,UI.EMAIL,UI.PROFILE_PICTURE,UI.DESCRIPTION FROM USER_INFO UI WHERE UI.USER_ID = ${userId}`);
        const send =  result.rows.map((item)=>{
            return{
                name:item[0],
                email:item[1],
                image:item[2],
                bio:item[3],
            }
        })
        res.send(send);
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/updatename/:userId/:newname', async (req, res) => {
    const userId = req.params.userId;
    const newName = req.params.newname;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`UPDATE USER_INFO SET NAME = '${newName}' WHERE USER_ID = ${userId}`);
        
        res.send({isSuccess:result.rowsAffected});
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/updatebio/:userId/:newbio', async (req, res) => {
    const userId = req.params.userId;
    const newBio = req.params.newbio;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`UPDATE USER_INFO SET DESCRIPTION = '${newBio}' WHERE USER_ID = ${userId}`);
        
        res.send({isSuccess:result.rowsAffected});
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/updateemail/:userId/:newemail', async (req, res) => {
    const userId = req.params.userId;
    const newEmail = req.params.newemail;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`UPDATE USER_INFO SET EMAIL = '${newEmail}' WHERE USER_ID = ${userId}`);
        
        res.send({isSuccess:result.rowsAffected});
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/updatepass/:userId/:newpass', async (req, res) => {
    const userId = req.params.userId;
    const newPass = req.params.newpass;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`UPDATE USER_INFO SET PASSWORD = '${newPass}' WHERE USER_ID = ${userId}`);
        
        res.send({isSuccess:result.rowsAffected});
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/updatepic/:userId/:newpic', async (req, res) => {
    const userId = req.params.userId;
    const newPic = req.params.newpic;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`UPDATE USER_INFO SET PROFILE_PICTURE = '${newPic}' WHERE USER_ID = ${userId}`);
        
        res.send({isSuccess:result.rowsAffected});
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/isUniqueName/:username', async (req, res) => {
    const username = req.params.username;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`SELECT * FROM USER_INFO WHERE NAME = '${username}'`);
        if(result.rows.length == 1){
            res.send({isUniqueName:false});
        }
        else{
            res.send({isUniqueName:true});
        }
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/isUniqueMail/:useremail', async (req, res) => {
    const useremail = req.params.useremail;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`SELECT * FROM USER_INFO WHERE Email = '${useremail}'`);
        if(result.rows.length == 1){
            res.send({isUniqueMail:false});
        }
        else{
            res.send({isUniqueMail:true});
        }
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/insertUser/:useremail/:usename/:userpass/', async (req, res) => {
    const useremail = req.params.useremail;
    const username = req.params.usename;
    const userpass = req.params.userpass;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`INSERT INTO User_Info VALUES (GET_NEXT_VALID_ID('USER_ID'),'${useremail}','${userpass}','${username}',NULL,NULL,0,NULL)`);
    
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/notifications/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`SELECT N.NOTIFICATION_TYPE,N.NOTIFIED_BY,N.NOTIFIED_TO,N.POST_ID,UI.NAME,UI.PROFILE_PICTURE FROM NOTIFICATION N
        JOIN USER_INFO UI 
        ON UI.USER_ID = N.NOTIFIED_BY
        WHERE NOTIFIED_TO = ${userId}
        ORDER BY N.TIME DESC`);
        const send = result.rows.map((item)=>{
            return{
                type:item[0],
                notified_by:item[1],
                notified_to:item[2],
                post:item[3],
                name:item[4],
                image:item[5],
            }
        })
        res.send(send);
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/stats/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`SELECT PI.POST_ID, (SELECT COUNT(*) FROM ACTIVITIES A WHERE A.POST_ID = PI.POST_ID) AS COMMENTS, (SELECT COUNT(*) FROM UP_VOTE U WHERE U.POST_ID = PI.POST_ID) AS VOTES FROM POST_INFO PI WHERE AUTHOR_ID = ${userId} ORDER BY POST_TIME ASC`);
        const send = result.rows.map((item)=>{
            return{
                postId:item[0],
                upvotes:item[1],
                comments:item[2],
            }
        })
        res.send(send);
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/deletepost/:postId', async (req, res) => {
    const postId = req.params.postId;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`DELETE FROM POST_INFO WHERE POST_ID = ${postId}`);
        res.send({isSuccess:result.rowsAffected});
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/deleteuser/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`DELETE FROM USER_INFO WHERE USER_ID = ${userId}`);
        res.send({isSuccess:result.rowsAffected});
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/isInCommunity/:userId/:communityId', async (req, res) => {
    const userId = req.params.userId;
    const communityId = req.params.communityId;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`SELECT * FROM COMMUNITY WHERE COMMUNITY_ID = ${communityId} AND MEMBER_ID = ${userId}`);
        res.send({isSuccess:result.rows.length});
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/isInContest/:userId/:communityId', async (req, res) => {
    const userId = req.params.userId;
    const communityId = req.params.communityId;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`SELECT * FROM CONTEST_REGISTRATION WHERE MEMER_ID = ${userId} AND CONTEST_ID = ${communityId}`);
        res.send({isSuccess:result.rows.length});
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/isRunning/:communityId', async (req, res) => {
    const communityId = req.params.communityId;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`SELECT * FROM CONTEST_INFO WHERE SYSDATE >= START_TIME AND SYSDATE <= END_TIME AND CONTEST_ID = ${communityId}`);
        res.send({isSuccess:result.rows.length});
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/insertInCommunity/:userId/:communityId', async (req, res) => {
    const userId = req.params.userId;
    const communityId = req.params.communityId;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`INSERT INTO COMMUNITY VALUES(${communityId},${userId})`);
        res.send({isSuccess:result.rowsAffected});
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/insertInContest/:userId/:communityId', async (req, res) => {
    const userId = req.params.userId;
    const communityId = req.params.communityId;
    try {
        const connection = await oracledb.getConnection({
            user: 'MEMESHUB',
            password: 'LetsCode',
            connectString: 'localhost:1521/orcl'
        });
        const result = await connection.execute(`INSERT INTO CONTEST_REGISTRATION VALUES(${communityId},${userId},0)`);
        res.send({isSuccess:result.rowsAffected});
        await connection.close();
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Configure multer to save uploaded files to the public/images/profiles folder
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "/memehub/memehub/public/images/memes/"));
    },
    filename: function (req, file, cb) {
      // Generate a unique filename for the uploaded file (you can use a library like uuid)
      const uniqueFilename = Date.now() + "-" + file.originalname;
      cb(null, uniqueFilename);
    },
  });
  
  const upload = multer({ storage: storage });
  
  // Define an API endpoint for image upload
  app.post("/upload", upload.single("image"), (req, res) => {
    // The uploaded file is saved, and its information is available in req.file
    const imageUrl = `${req.file.filename}`;
    res.json({ imageUrl });
  });

  // Configure multer to save uploaded files to the public/images/profiles folder
const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "/memehub/memehub/public/images/community/"));
    },
    filename: function (req, file, cb) {
      // Generate a unique filename for the uploaded file (you can use a library like uuid)
      const uniqueFilename = Date.now() + "-" + file.originalname;
      cb(null, uniqueFilename);
    },
  });
  
  const upload2 = multer({ storage: storage2 });
  
  // Define an API endpoint for image upload
  app.post("/uploadcommunity", upload2.single("image"), (req, res) => {
    // The uploaded file is saved, and its information is available in req.file
    const imageUrl = `${req.file.filename}`;
    res.json({ imageUrl });
  });


  const storage3 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "/memehub/memehub/public/images/sponsor/"));
    },
    filename: function (req, file, cb) {
      // Generate a unique filename for the uploaded file (you can use a library like uuid)
      const uniqueFilename = Date.now() + "-" + file.originalname;
      cb(null, uniqueFilename);
    },
  });
  
  const upload3 = multer({ storage: storage3 });
  
  // Define an API endpoint for image upload
  app.post("/uploadsponsor", upload3.single("image"), (req, res) => {
    // The uploaded file is saved, and its information is available in req.file
    const imageUrl = `${req.file.filename}`;
    res.json({ imageUrl });
  });

  const storage4 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "/memehub/memehub/public/images/profile/"));
    },
    filename: function (req, file, cb) {
      // Generate a unique filename for the uploaded file (you can use a library like uuid)
      const uniqueFilename = Date.now() + "-" + file.originalname;
      cb(null, uniqueFilename);
    },
  });
  
  const upload4 = multer({ storage: storage4 });
  
  // Define an API endpoint for image upload
  app.post("/uploaddp", upload4.single("image"), (req, res) => {
    // The uploaded file is saved, and its information is available in req.file
    const imageUrl = `${req.file.filename}`;
    res.json({ imageUrl });
  });

  const storage5 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "/memehub/memehub/public/images/templates/"));
    },
    filename: function (req, file, cb) {
      // Generate a unique filename for the uploaded file (you can use a library like uuid)
      const uniqueFilename = Date.now() + "-" + file.originalname;
      cb(null, uniqueFilename);
    },
  });
  
  const upload5 = multer({ storage: storage5 });
  
  // Define an API endpoint for image upload
  app.post("/uploadtemp", upload5.single("image"), (req, res) => {
    // The uploaded file is saved, and its information is available in req.file
    const imageUrl = `${req.file.filename}`;
    res.json({ imageUrl });
  });
// // Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
