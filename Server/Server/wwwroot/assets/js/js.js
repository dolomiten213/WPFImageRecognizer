"use strict";

let buttonCreated = false;
let index = 0;
let paths;


GetRecognitions();


async function GetRecognitions()
{
    const response = await fetch("/recognition/loadwithoutimages", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const recognitions = await response.json();
        recognitions.forEach(rec => {
            let inp = document.createElement('input')
            inp.type = "radio"
            inp.name = "a"
            inp.value = rec.id
            inp.onchange = RecognitionSelectionChanged;
            let li = document.createElement('li');
            li.append(inp)
            li.append(rec.title)
            li.append(rec.count)
            li.append(document.createElement('br'))
            ol.append(li)
        });
    }
}

async function RecognitionSelectionChanged()
{
    const response = await fetch("/recognition/" + this.value, {
        method: "GET",
        headers: { "Accept": "application/json" },
    });
    if (response.ok === true) {
        paths = await response.json();
        AddImage(0);
        let counter = document.getElementById("counter");
        counter.textContent = (1) + "/" + paths.length;
        if (!buttonCreated)
        {
            buttonCreated = true;
            let inp = document.createElement('input')
            inp.type = "button"
            inp.value = "<"
            inp.onclick = Previous;
            pictire.append(inp);
            inp = document.createElement('input')
            inp.type = "button"
            inp.value = ">"
            inp.onclick = Next;
            pictire.append(inp);
        }
    }
}

async function AddImage(ind)
{
    let img = document.getElementById('img')
    img.src = ("data:image/png;base64," + paths[ind])
}

async function Next()
{
    if (index == paths.length-1)
    {
        index = -1;
    }
    AddImage(++index)
    let counter = document.getElementById("counter");
    counter.textContent = (index+1) +"/"+ paths.length;
}

async function Previous() {

    if (index == 0)
    {
        index = paths.length
    }
    AddImage(--index)
    let counter = document.getElementById("counter");
    counter.textContent = (index+1) + "/" + paths.length;
}
