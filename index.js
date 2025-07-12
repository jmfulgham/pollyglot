let translation;
const languageSelect = document.getElementById("language-form");
const translationValue = document.getElementById("chat-box")
let value;
const insertTranslationBox = () => {
    const translationBoxStyles  = `height: 118px; width: 317px; background-color: #EFF0F4; border-radius: 10px; margin-left:20px;
    padding:10px;`
    const translationBox = document.createElement("div")
    translationBox.style = translationBoxStyles;
    document.getElementById("language-form").style.display = 'none';

    const titles = document.getElementsByClassName("chat-title");
    const [chatTitle1, chatTitle2] = titles
    chatTitle1.innerHTML = "<h3> Original Text 👇</h3>";
    chatTitle2.innerHTML = "<h3>Your Translation 👇</h3>";

    const restartBtn = document.createElement("button");
    const restartBtnStyles = `background-color: #7C3AED; color: white; width: 322px; height: 50px; border-radius: 10px; border:none; margin-top: 30px; margin-left: 30px; font-size: 16px;`
    restartBtn.style= restartBtnStyles;
    restartBtn.innerHTML = "Start Over";

    const chatForm = document.getElementById("chat-form");
    chatForm.appendChild(translationBox);
    chatForm.appendChild(restartBtn)

}

translationValue.addEventListener("change", (e) =>{
     value = e.target.value;
})

languageSelect.addEventListener('submit', (event) => {
    event.preventDefault();
    const radioButtons = document.getElementsByName("fav_language")

    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            translation = radioButtons[i].id
        }
    }

    insertTranslationBox()
    getTranslation()
    appendTranslationToDOM()
});


const getTranslation = () => {

}

const appendTranslationToDOM = () => {

}
