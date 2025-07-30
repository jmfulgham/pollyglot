let translationSelection;
let translationText;
const languageSelect = document.getElementById("language-form");
const translationInput = document.getElementById("chat-box");
const restartBtn = document.createElement("button");
const translateBtn = document.querySelector('input[type="submit"]')
const errorMsg = document.createElement("p");

const removeDisabledStyle = () => {
    if(translateBtn.attributes.getNamedItem("disabled")) {
        translateBtn.removeAttribute("disabled")
    }
}

const insertTranslationBox = () => {
    const translationBoxStyles = `height: 118px; width: 317px; background-color: #EFF0F4; border-radius: 10px; margin-left:20px;
    padding:10px; font-size: 16px;`;
    const translationBox = document.createElement("div");
    translationBox.setAttribute("id", "ai-translation");
    translationBox.setAttribute("type", "text");
    translationBox.style = translationBoxStyles;
    document.getElementById("language-form").style.display = 'none';

    const titles = document.getElementsByClassName("chat-title");
    const [chatTitle1, chatTitle2] = titles;
    chatTitle1.innerHTML = "<h3> Original Text 👇</h3>";
    chatTitle2.innerHTML = "<h3>Your Translation 👇</h3>";

    restartBtn.setAttribute("id", "restart-btn")
    restartBtn.style = `background-color: #7C3AED; color: white; width: 322px; height: 50px; border-radius: 10px; border:none; margin-top: 30px; margin-left: 30px; font-size: 16px;`;
    restartBtn.innerHTML = "Start Over";

    const chatForm = document.getElementById("chat-form");
    chatForm.appendChild(translationBox);
    chatForm.appendChild(restartBtn);
}

const inputCheck = () => {

    if (translationSelection !== undefined && translationText !== undefined) {

        //clear any errors from previous submissions
        const error = document.getElementsByName("error");
        if (error.length > 0 ) {error[0].style = `display: none;`}

        insertTranslationBox();
        getTranslation().then(res => appendTranslationToDOM(res.content));
    } else {
        errorMsg.innerHTML = "Please fill out the form, then resubmit";
        errorMsg.style=`color: red; margin: 12px 0 0 20px;`
        errorMsg.setAttribute("name", "error")
        document.getElementById("chat-input").appendChild(errorMsg);
        translateBtn.setAttribute("disabled", true);
    }
}

const getTranslation = async () => {
    const data = {type: "text", text: `Translate in the language ${translationSelection}: ${translationText}`}
    const messages = [
        {
            role: "system",
            content: "You are a local that speaks the language provided by the user. Translate the text you receive from the user like a local would.",
        },
        {
            role: "user",
            type: "text",
            content: [data]
        }]

    const url = "https://mo-openai-api-worker.oa-api-worker.workers.dev/";

    try {
        const xhr = new XMLHttpRequest();
        return new Promise((resolve, reject) => {
            xhr.onreadystatechange = (e) => {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                }

                //sweeping error handling
                if(xhr.status !== 200) {
                    const resp = JSON.parse(xhr.responseText)
                    reject(resp);
                    errorMsg.innerHTML = `There was an error with your request: ${resp.error}`;
                    errorMsg.style=`color: red; margin: 12px 0 0 20px;`
                    errorMsg.setAttribute("name", "error")
                    document.getElementById("ai-translation").appendChild(errorMsg);
                }
            };
            xhr.open("POST", url);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(messages));
        })
    } catch (e) {
        console.error("Error connecting with Open AI ", e);
    }
}

const appendTranslationToDOM = (response) => {
    const translationBox = document.getElementById("ai-translation");
    const responseParagraph = document.createElement("p");
    translationBox.appendChild(responseParagraph);
    responseParagraph.textContent = response;
}
translationInput.addEventListener("change", (e) => {
    translationText = e.target.value;
    removeDisabledStyle()
})

languageSelect.addEventListener('change', (event) => {
    removeDisabledStyle()
});

languageSelect.addEventListener('submit', (event) => {
    event.preventDefault();
    const radioButtons = document.getElementsByName("fav_language");

    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            translationSelection = radioButtons[i].id
        }
    }
    inputCheck();
});

restartBtn.addEventListener("click", () => {
    document.getElementById("chat-box").value = "";
    document.getElementById("language-form").reset();
    window.location.reload();
})
