import express from 'express'
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors());

const users = [
    {
        username: "bobesponja",
        avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
    }
]
const tweets = [
    {
        username: "bobesponja",
        tweet: "eu amo o hub"
    }
]
app.post("/sign-up", (req, res) => {
    const user = req.body;
    users.push(user);
    res.send('OK');
})
app.get("/tweets", (req, res) => {
    const lastTweets = tweets.map((tweet) => {
        return {
            ...tweet,
            avatar: users.find(user => user.username === tweet.username).avatar
        }
    })
    res.send(lastTweets.slice(0, 10))
})
app.post('/tweets', (req, res) => {
    const tweet = req.body;
    tweets.unshift(tweet);
    res.send('OK');
})

app.listen(5000, () => { console.log('Server rodando na prota 5000') })
