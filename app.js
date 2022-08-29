import express from 'express'
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors());

const users = [
    {
        username: "bobesponja",
        avatar: "https://i.pinimg.com/474x/5b/66/e5/5b66e5fd227e7608db5790942d2a7215.jpg"
    },
    {
        username: "dickvigarista",
        avatar: "https://img.elo7.com.br/product/main/92168F/botton-dick-vigarista-vintage.jpg"
    },
    {
        username: "patolino",
        avatar: "https://i.pinimg.com/236x/dd/06/82/dd0682c2832fc584d475b37944b7b7d5--root-vegetable-stew-root-vegetables.jpg"
    },
    {
        username: "pernalonga",
        avatar: "https://i.pinimg.com/550x/45/6e/b1/456eb1a7d3d67ebc8489e5848c1cf1aa.jpg"
    },
    {
        username: "pink",
        avatar: "https://3.bp.blogspot.com/-SkVPho0iuxM/W0azLUtrTCI/AAAAAAAAV0A/nyaJ2swR1qUcwxu0bxx7DsZir7ry0P2RgCLcBGAs/s400/pink%2Be%2Bcerebro%2B3.jpg"
    },
    {
        username: "cerebro",
        avatar: "https://cdn.meadd.net/photos/full/24789869.jpg"
    },
    {
        username: "salsicha",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR04mqyKSmPeV06G8xx-HVhQ6J180mk_tSCag&usqp=CAU"
    },
    {
        username: "scoobydoo",
        avatar: "http://2.bp.blogspot.com/-5Th0XR6HrtA/T9eJXZITznI/AAAAAAAAFkc/x4DSs0zTFZA/s1600/Scoobydoo-PNG-Queroimagem.com.png"
    },
    {
        username: "piupiu",
        avatar: "https://img.elo7.com.br/product/original/27ABF4F/piu-piu-baby-looney-tunes-scrapbook.jpg"
    },
    {
        username: "hulk",
        avatar: "https://as2.ftcdn.net/v2/jpg/03/48/07/05/1000_F_348070521_LCzQFu6df3vYaLQMUAZbE3EWlNXFNevY.jpg"
    },
    {
        username: "dory",
        avatar: "https://i.pngimg.me/thumb/f/720/comhiclipartdcjgg.jpg"
    },
    {
        username: "picapau",
        avatar: "https://i.pinimg.com/236x/46/99/64/469964f68795a409da5c5f7700a92e6a--camping-images-woody-woodpecker.jpg"
    },
    {
        username: "corvojubileu",
        avatar: "http://pm1.narvii.com/6450/56811f7ca68e42a264f274d28a91952027db2ac5_00.jpg"
    },
    {
        username: "buzzlightyear",
        avatar: "https://www.fatosevalores.com.br/wp-content/uploads/2016/01/Buzz_Lightyear_out_of_the_box.jpg"
    }
]
const tweets = [
    {
        username: "bobesponja",
        tweet: "HEHEHEHE"
        
    },
    {
        username: "patolino",
        tweet: "Você é desprezivel."
    },
    {
        username: "pernalonga",
        tweet: "O que é que há, velhinho?!"
    },
    {
        username: "cerebro",
        tweet: "O que nós fazemos todas as noites... Tentar dorminar o MUNDO!!!"
    },
    {
        username: "pink",
        tweet: "O que vamos fazer hoje @cerebro?"
    },
    {
        username: "scoobydoo",
        tweet: "@salsicha, Scooby-doo-by-dooooo!"
    },
    {
        username: "salsicha",
        tweet: "@scoobydoo, meu filho, onde está você?"
    },
    {
        username: "piupiu",
        tweet: "Eu acho que eu vi um gatinho."
    },
    {
        username: "hulk",
        tweet: "@hulk, esmaga!"
    },
    {
        username: "buzzlightyear",
        tweet: "Ao infinito, e além!"
    },
    {
        username: "corvojubileu",
        tweet: "@picapau, você falou coberta de açucar!? hehehe..."
    },
    {
        username: "picapau",
        tweet: "@corvojubileu, é e coberta de açucar!"
    },
    {
        username: "corvojubileu",
        tweet: "@picapau, você disse quente na manteiga?"
    },
    {
        username: "picapau",
        tweet: "@corvojubileu, pipoca quente na manteiga!"
    },
    {
        username: "corvojubileu",
        tweet: "@picapau, que tipo?"
    },
    {
        username: "picapau",
        tweet: "@corvojubileu, aham!"
    },
    {
        username: "corvojubileu",
        tweet: "@picapau, você falou em pipoca?"
    },
    {
        username: "picapau",
        tweet: "@corvojubileu, hey cara, você gosta de pipoca?"
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
    const page = Number(req.query.page)
    console.log(page)
    
    const lastTweets = tweets.map((tweet) => {
        return {
            ...tweet,
            avatar: users.find(user => user.username === tweet.username).avatar
        }
    })
    if(page) {
        if(page < 1) {
            return res.status(400).send("Insira uma página válida.")
        }
        const tweetsFromPage = lastTweets.slice((10 * page)-9, 10 * page)
        if(tweetsFromPage.lenth === 0) {
            return res.status(404).send("Pagina não encontrada.")
        }
        return res.send(tweetsFromPage)
    }
     res.send(lastTweets.slice(0, 10))
})
app.post('/tweets', (req, res) => {
    const { tweet } = req.body
    const username = req.headers.user

    if (!username || !tweet) {
        return res.status(400).send("Todos os campos são obrigatórios.")
    }

    const post = {
        tweet,
        username
    }
    tweets.unshift(post);
    res.status(201).send('OK');
})

app.listen(5000, () => { console.log('Server rodando na prota 5000') })
