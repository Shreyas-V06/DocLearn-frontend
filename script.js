

document.getElementById('uploaded_file').addEventListener('change', function () {
    const fileInput = this;
    const fileStatus = document.getElementById('file-status');

    if (fileInput.files.length > 0) {
        const fileName = fileInput.files[0].name;
        fileStatus.textContent = ` File uploaded: ${fileName}`;
    } else {
        fileStatus.textContent = "";
    }
});




async function query_file()
{    console.log("entered the function")
    let file_object = document.getElementById('uploaded_file')
    let file=file_object.files[0]
    let user_question=document.getElementById("user_question").value
    let answer_box=document.getElementById("answer_box")
    if (!file) {
    answer_box.textContent="Please upload a file first"
    return;
    }
    let form = new FormData()
    form.append("user_question",user_question)
    form.append("uploaded_file",file)
    console.log("created the form")
    try
    {   console.log("ready to await")
        answer_box.textContent="Thinking..."
        let iresponse=await fetch("https://doclearn-backend-sv.onrender.com/uploadfile", 
            {
                method:'POST',
                body: form
            }
        );
        console.log("await over")
        let response = await iresponse.json()
        console.log("Response from FastAPI:", response)
        console.log("Now rendering the frontend...")
        answer_box.textContent=response['answer']
        console.log("Rendered answer box...")
    }

    catch (error)
    {
        console.error('error')
    }

    finally
    {
        console.log("exited out of the function")
    }
}