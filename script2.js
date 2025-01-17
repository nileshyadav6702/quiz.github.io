const correctaudio = document.querySelector('#correct')
const wrongaudio = document.querySelector('#wrong')
const progressbar = document.querySelector('.correct-bar')
const correctpercentage = document.querySelector('.left-part > p')
const wrongpercentage = document.querySelector('.right-part > p')
const displayvalue = document.querySelector('#progress-value')
const countdown = document.querySelector('#counter')
const nextbtn = document.querySelector('.next-part')
const countbg = document.querySelector('.timer')
const options = document.querySelectorAll('.option')
const questionfiledset = document.querySelector('.question')
const option = [...options]
const main=document.querySelector('.hero-section')
const result=document.querySelector('.main')
const reset=document.querySelector('.retry-btn')


const page = document.querySelector('.page-count')
const questions = [
    ['Inside which HTML element do we put the JavaScript?', {
        'js (tag)': false,
        'scripting (tag)': false,
        'javascript (tag)': false,
        'script (tag)': true

    }],
    ['JavaScript is the programming language of the _____.', {
        'Desktop': false,
        'Mobile': false,
        'Web': true,
        'server': false
    }],
    ['Which type of JavaScript language is _____?', {
        'object-oriented': false,
        'object-based': true,
        'functinal programming': false,
        'all of the above': false
    }],
    ['Which of the following statement(s) is true about the JavaScript?', {
        'It is a scripting language used to make the website interactive': true,
        'It is an advanced version of Java for Desktop and Mobile application development': false,
        'It is a markup language of Java to develop the webpages': false,
        'All of the above': false
    }],
    ['Which symbol is used separate JavaScript statements?', {
        'Comma (,)': false,
        'Colon (:)': false,
        'Hyphen (_)': false,
        'Semicolon (;)': true
    }]
]


let i = 0
let x = 0
var correct = 0
localStorage.setItem('correct', correct)
var val = false




function timer(a) {
    const time = setInterval(() => {
        if (i >= 0) {
            countdown.innerText = i;
            if (i == 15) {
                document.body.style.backgroundColor = "#dbdcb1"
                countbg.style.backgroundColor = '#ccbf3a'
            }
            if (i == 5) {
                document.body.style.backgroundColor = "#dbadad"
                countbg.style.backgroundColor = '#cc4038'
            }

            option.forEach((opt) => {
                if (opt) {
                    opt.addEventListener('click', (e) => {
                        for (let m = 0; m < 4; m++) {
                            option[m].classList.add('pointer')

                        }


                        clearInterval(time)
                        // debugger
                        if (questions[a][1][e.target.innerText]) {
                            wrongaudio.pause()
                            correctaudio.play()
                            e.target.classList.add('correct')
                            val = true




                        }
                        else {
                            val = false
                            wrongaudio.play()
                            e.target.classList.add('wrong')
                            option.forEach((opn) => {
                                if (questions[a][1][opn.innerText]) {
                                    opn.classList.add('correct')

                                }
                            })

                        }


                    })
                }

            })
        }
        else {
            val = false
            clearInterval(time)
            for (let m = 0; m < 4; m++) {
                option[m].classList.add('pointer')

            }
            option.forEach((ant) => {
                if (questions[a][1][ant.innerText]) {
                    ant.classList.add('correct')
                }
            })

        }

        i--;
    }, 1000)

}


if (x < questions.length){
    nextbtn.addEventListener('click', () => {
        if (val) {
            correct++
            count=correct
            localStorage.setItem('correct', correct)
        }
        val = false
        for (let m = 0; m < 4; m++) {
            option[m].classList.remove('pointer')
        }
        document.body.style.backgroundColor = "#cce2c2"
        countbg.style.backgroundColor = '#44b845'
        page.innerText = `${x + 1}/ ${questions.length}`
        questionfiledset.innerText = questions[x][0]
        let b = 0
        for (qn in questions[x][1]) {
            option[b].innerText = qn
            b++
        }
        for (let y = 0; y < 4; y++) {
            option[y].classList.remove('correct')
            option[y].classList.remove('wrong')
        }
      
        timer(x)
        if(x+1 == questions.length){
            
            nextbtn.children[0].innerText = 'Submit >'   
            console.log('hii');
            nextbtn.addEventListener('click',()=>{
                main.style.display="none"
                result.style.display="block"
                progressbar.style.width = `${(+localStorage.getItem('correct') / questions.length) * 100}%`
                correctpercentage.innerText = `${(+localStorage.getItem('correct') / questions.length) * 100}%`
                wrongpercentage.innerText = `${(100 - ((+localStorage.getItem('correct') / questions.length) * 100))}%`
                displayvalue.innerText = `${+localStorage.getItem('correct')}/${questions.length}`
                reset.addEventListener('click',()=>{
                    location.reload()
                })

            })
        }
        x++
        i = 30
    })
}








