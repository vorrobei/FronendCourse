const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./assets/db/db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/questions', (req, res) => {        
    
    const questions = router.db.get('question').value()

    const questionsFiltered = questions.filter((e) => {        
        return req.query['id'].includes(e.id.toString())
    });

    const questionsRes = structuredClone(questionsFiltered)

    questionsRes.forEach(q => {
        delete q["correct"]
    });

    res.json(questionsRes);    
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

server.post('/check_answer', (req, res) => {
    
    let _questions = router.db.get('question').value();        

    let _question = _questions.find((q) => { 
        return q.id === req.body.questionID
    });

    let correctAnswerID = _question.answers.find((answer) => {         
        return answer.correct 
    }).id;       

    res.json({
        "isCorrect": req.body.answerID === correctAnswerID,
        "correctID": correctAnswerID
    });
});

// Use default router
server.use(router)
server.listen(3034, () => {
    console.log('JSON Server is running')
})