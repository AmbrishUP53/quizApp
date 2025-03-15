document.addEventListener("DOMContentLoaded" , ()=>{
    url = `https://opentdb.com/api.php?amount=10&category=17&type=multiple`

    const result = document.getElementById("result");
    const mainSection = document.querySelector("#Main-section");
    
    let correctAnswers = []
    
    
    async function FetchQuestion() {
        let response = await fetch(url);
        let data = await response.json();
        console.log("response : " , response)
       
        return data.results ;
    }
    
    function  createElement(el , parentEl){
        let element = document.createElement(el);
        parentEl.appendChild(element) ;
        return element ;
    }
    
    // let element = createElement("div" , mainSection);
    // element.innerText = "My self Ambrish Kasaudhan"
    // element.classList.add("question")
    
    
    async function getData() {
        let res = await FetchQuestion();
        fetchAndSetData(res)
        console.log("results : " ,res)
    }

    function RandomIndex(){
        return [0 ,1 ,2 ,3].sort(()=> Math.random() - 0.5);
    }
    
    function fetchAndSetData(data){
        console.log("data :" , data[0]);
        let Qcount = 0 ;
        data.forEach((ques) => {
            
            let options = []
            Qcount  += 1 ;
            let QuestionBox =  createElement("div" , mainSection);
            QuestionBox.classList.add("question");
            QuestionBox.innerText = `Q.${Qcount} ${ques.question} ` ;

            let Answerbox = createElement("div" , QuestionBox);
            Answerbox.classList.add("AnswerBox", `AnswerBox${Qcount}`);

            let CorrAnswer = ques.correct_answer ;
            options.push(CorrAnswer) ;
            correctAnswers.push(CorrAnswer);
            options = options.concat(ques.incorrect_answers);
           
            let RandomIdx = RandomIndex();
            let char = 97 ;
            for(let i = 0 ; i <options.length; i++){
                let bullets = String.fromCharCode(char++);
                let idx = RandomIdx[i];
                let btns = createElement("buttons" , Answerbox);
                btns.classList.add("Answers" , `Answer${Qcount}`)
                if(options[idx] == CorrAnswer){
                    btns.classList.add("CorrectAnswer");
                }
                btns.innerText = `${bullets} ) ${options[idx]}`
            
            }
           




           
        });
      

        return data ;
    
    
    }
    getData()

    let count = 0 ;
    mainSection.addEventListener("click" , (e)=>{
        
       for (let i = 1; i <= 10; i++) {
            if(e.target.classList.contains(`Answer${i}`)){
                if(e.target.classList.contains("CorrectAnswer") ){
                    e.target.style.backgroundColor = "green" ;
                    count++ ; 
                    result.innerText = count;  
                }
                else{
                    e.target.style.backgroundColor = "red" ;
                }

                e.target.closest(".AnswerBox").classList.add("disabled");
                break ;
            }
       }
        console.log()
    })

    
 
    function getFeedback(score) {
        let message = "";
    
        if (score === 10) {
            message = "🎉 Excellent! Perfect score! Keep up the great work! 🚀";
        } else if (score >= 8) {
            message = "😊 Great job! You did really well. Keep practicing! 💪";
        } else if (score >= 5) {
            message = "👍 Good effort! You can do even better next time. Keep learning! 📚";
        } else if (score >= 3) {
            message = "😐 Not bad, but you need to work harder. Believe in yourself! 💡";
        } else {
            message = "😞 Don't give up! Learn from mistakes and try again. You can do it! 💯";
        }
    
        return message;
    }

    const submitBtn = document.getElementById("Submit");
    const restartBtn = document.getElementById("Restart");

    submitBtn.addEventListener("click" ,(e)=>{
        let msg = getFeedback(count);
        // document.getElementById("ResultMsg").innerText =
        document.getElementById("ResultMsg").innerText = `Score : ${count} \n ${msg}`;

        document.getElementById("resultBox").classList.remove("hidden");
    })

    document.getElementById("backBtn").addEventListener("click" , ()=>{
        document.getElementById("resultBox").classList.add("hidden");
    })
    



}); //Document event




// fetch(url)
// .then((response)=>{
//     console.log(response);
//     return response.json()
// })
// .then((data)=>{
//     resultData = data.results[0]
//     question = resultData.question
//     incorrectAnswer = resultData.incorrect_answers
//     correctAnswer = resultData.correct_answer

//     options.push(correctAnswer )
//     options = options.concat(incorrectAnswer)
//     console.log("options : ", options)
//     console.log(resultData)
//     console.log(question)
//     console.log(correctAnswer)
//     console.log(incorrectAnswer)
// })

// console.log("options : ", options)


// async function getAndFetchData(){
//     let data = await getQuestions();
//     console.log("data: ", data)
//     i = 0 ;
//     data.forEach(el => {
//         i += 1 ;
//         let queue = document.createElement("div") ;
//         queue.classList.add("question")
//         document.getElementById("Main-section").appendChild(queue)


//         let p = document.createElement("p");
//         p.innerText = `Qusetion ${i} ) ${el.question}` ;
//         p.classList.add("question") ;
//         queue.appendChild(p);
//         let CorrectAns = el.correct_answer;
//         let options = el.incorrect_answers ;
//         options.push(CorrectAns) ;
//         correctAnswer.push(CorrectAns);
//         let indexSet = randomIndex();

//         for (let idx = 0; idx < options.length; idx++) {
//             let k = 90 ;
//             let char = String.fromCharCode(k++)
//             let btn = document.createElement("button");
//             btn.classList.add("Answers") ;
//             btn.classList.add(`options${i}`);

         
//             let index = indexSet[idx]

//             btn.innerText = `${char} ) ${options[index]}` ;
//             queue.appendChild(btn);
            
//         }
//         document.querySelectorAll(".Answers").forEach((btn)=>{
//             btn.addEventListener("click" , (e)=>{
//                 if(e.target.innerText == CorrectAns){
//                     e.target.style.color = "green";
//                 }
//             })
//         })

//     });
// }


// async function getQuestions() {
//     let response = await fetch(url);
//     let data = await response.json();
    
//     console.log("Response : " ,response)
//     console.log("data : " ,data.results)
//     return data.results
    
// }


// getAndFetchData(); 


// function randomIndex(){
//     return [0 ,1 ,2 ,3].sort(()=> Math.random() - 0.5);
// }
