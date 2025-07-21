let questionField = document.querySelector('.question')
let answerButtons = document.querySelectorAll('.answer')
let h3 = document.querySelector('.container_h3')
let startBtn = document.querySelector(".start-btn")
let startContainer = document.querySelector(".start-container")
let container = document.querySelector(".container")

let cookie = false
let cookies = document.cookie.split('; ')

for(let i = 0; i < cookies.length; i += 1){
    let temp = cookies[i].split('=')
    if(temp[0] == 'numbers_hight_score'){
        cookie = temp[1]
        break
    }
}

function randint(min, max){
    return Math.round(Math.random() * (max - min) + min)
}

let signs = ['+', '-', '*', '/']
function getRandomSign(){
    return signs[randint(0, 3)]
}

function shuffle(array){
    let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}


if (cookie){
    let data = cookie.split('/')
    h3.innerHTML = `Минулого разу ви дали ${data[1]} правильних відповідей із 
    ${data[0]}. Точність - ${Math.round(data[1] * 100 / data[0])}%.`

}


class Question{
    constructor(){
        let a = randint(1, 30)
        let b = randint(1, 30)
        let sign = getRandomSign()
        this.question = `${a} ${sign} ${b}`
        if (sign == '+'){
            this.correctAns = a + b
        }
        if (sign == '-'){
            this.correctAns = a - b
        }
        if (sign == '*'){
            this.correctAns = a * b
        }
        if (sign == '/'){
            this.correctAns = a / b
        }
        this.answers = [
            this.correctAns, 
            randint(this.correctAns - 15, this.correctAns + 15),
            randint(this.correctAns - 15, this.correctAns + 15),
            randint(this.correctAns - 15, this.correctAns + 15),
            randint(this.correctAns - 15, this.correctAns + 15)
        ]
        shuffle(this.answers)
    }

    display(){
        questionField.innerHTML = this.question

        for(let i = 0; i < this.answers.length; i++){
            answerButtons[i].innerHTML = this.answers[i]
        }
    }
}

let currentQuestion
let correct_ans_given
let total_ans_given

startBtn.addEventListener('click', function(){
    startContainer.style.display = 'none'
    container.style.display = 'flex'

    currentQuestion = new Question()
    currentQuestion.display()

    correct_ans_given = 0
    total_ans_given = 0

    setTimeout(function(){

        let newCookie = `numbers_hight_score=${total_ans_given}/${correct_ans_given}; max-age=10000000`
        document.cookie = newCookie

        startContainer.style.display = 'flex'
        container.style.display = 'none'

        h3.innerHTML = `${correct_ans_given} правильних відповідей із ${total_ans_given}.
        Точність - ${Math.round(correct_ans_given * 100 / total_ans_given)}%`
    }, 10000)

    for(let i = 0; i < answerButtons.length; i++){
        answerButtons[i].addEventListener('click', function(){
            if(answerButtons[i].innerHTML == currentQuestion.correctAns){
                correct_ans_given += 1
                answerButtons[i].style.background = '#00FF00'
                anime({
                    targets: answerButtons[i],
                    background: '#FFFFFF',
                    duration: 500,
                    delay: 100,
                    easing: 'linear'
                })
            }else{
                answerButtons[i].style.background = '#FF0000'
                anime({
                    targets: answerButtons[i],
                    background: '#FFFFFF',
                    duration: 500,
                    delay: 100,
                    easing: 'linear'
                })
            }
            total_ans_given += 1

            currentQuestion = new Question()
            currentQuestion.display()
        })
    }


})
