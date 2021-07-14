let buttonCreated = false;
let index = 0;
let paths;
let previewBlockIsCreated = false;

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

            let count = document.createElement('h2');
            count.innerHTML = rec.count;
            count.classList.add("recognition_class_count");

            let recognitionClassName = document.createElement('h2');
            recognitionClassName.innerHTML = rec.title;
            recognitionClassName.classList.add("recognition_class_name");
           
            let li = document.createElement('li');
            li.classList.add("recognitions_list_item")
            li.value = rec.id;
            li.onclick = RecognitionSelectionChanged;
            
            li.append(recognitionClassName)
            li.append(count)
                    
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
        console.log(paths);
        if (!previewBlockIsCreated) {
            
            let img = document.createElement("img")
            img.id = "img"
            
            let prev = document.createElement("button");
            prev.classList.add("change_img_button");
            prev.classList.add("prev");
            prev.onclick = Previous;
            
            let next = document.createElement("button");
            next.classList.add("change_img_button");
            next.classList.add("next");
            next.onclick = Next;

            /* let name = document.createElement("h3");
            name.innerHTML = paths[0]; */

            let counter = document.createElement("h3");
            counter.id = "counter";
            counter.innerHTML = (index + 1) + "/" + paths.length;

            let label = document.createElement("div");
            label.classList.add("title")
            //label.append(name);
            label.append(counter);

            let div = document.createElement("div")
            div.classList.add("pictire");

            div.append(prev);
            div.append(img);
            div.append(next);
            

            let previewBlock = document.getElementById("preview_block");
            previewBlock.append(div);
            previewBlock.append(label);
            
            previewBlockIsCreated = true;
        }

        index = 0;
        AddImage(0);
    }
}
async function AddImage(ind)
{
    let img = document.getElementById('img')
    img.src = ("data:image/png;base64," + paths[ind])
}
async function Next()
{
    if (index == paths.length - 1)
    {
        index = -1;
    }
    AddImage(++index);
    let counter = document.getElementById("counter");
    counter.textContent = (index + 1) + "/" + paths.length;
}
async function Previous() {

    if (index == 0)
    {
        index = paths.length
    }
    AddImage(--index)
    let counter = document.getElementById("counter");
    counter.textContent = (index + 1) + "/" + paths.length;
}