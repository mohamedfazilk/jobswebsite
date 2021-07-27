document.querySelector(".button-container")
.addEventListener("click", () =>{
  let text = document.getElementById("filter-jobs").value
  getjobs().then(jobs =>{
      let filteredjobs = filterjobs(jobs,text);
     showjobs(filteredjobs)
  })
  
})


function getjobs(){
    return fetch("data.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return data
    })
}


function filterjobs(jobs, searchText){
    if(searchText){
        let filteredjobs =jobs.filter(job =>{
            if(job.roleName.toLowerCase().includes(searchText)
            ||job.type.toLowerCase().includes(searchText)
            ||job.company.toLowerCase().includes(searchText)
            ||job.requirements.content.toLowerCase().includes(searchText)){
                return true;
            }
            else{
                return false;
            }
        })
        return filteredjobs;    
    }else{
    return jobs;
    }
}



function showjobs(jobs){
    console.log( jobs);

    let Jobscontainer = document.querySelector(".jobs-container");
    console.log(Jobscontainer);

    let jobsHtml = "";
    jobs.forEach(job =>{
       
        jobsHtml +=`
        
        <div class="job-tile">
            <div class="top">
                <img src="${job.logo}">
                <span class="material-icons mor_ehoriz">more_horiz</span>
            </div>

            <div class="role-name">
                <span>${job.roleName}</span>
            </div>

            <div class="description">
                <span>${job.requirements.content} </span>
            </div>

            <div class="buttons">

                <div class="button apply-now">
                    Apply Now
                </div>

                <div class="button">
                    Message
                </div>


            </div>

        </div>
        
        `


    })
   Jobscontainer.innerHTML =jobsHtml


}

getjobs().then(data => {
    showjobs(data);
});

