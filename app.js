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
    const { username, avatar } = req.body
    if (!username || !avatar) {
        return res.status(400).send("Todos os campos são obrigatórios.")
    }
    const user = req.body;
    users.push(user);
    res.status(201).send('OK');
})
app.get("/tweets/:name", (req, res) => {
    const name = req.params.name
    const personTweets = tweets.filter(tweet => tweet.username === name)
    const tweetsWithImg = personTweets.map(tweet => {
        return{
            ...tweet,
            avatar: users.find(user => user.username === tweet.username).avatar
        }
    })
    if (personTweets.length === 0) {
        return res.status(404).send('Nenhum tweet desse usuario foi encontrado')
    }
    return res.status(200).send(tweetsWithImg)
    
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
    const { username, tweet } = req.body

    if (!username || !tweet) {
        res.status(400).send("Todos os campos são obrigatórios.")
    }

    const post = req.body;
    tweets.unshift(post);
    res.status(201).send('OK');
})

app.listen(5000, () => { console.log('Server rodando na prota 5000') })
