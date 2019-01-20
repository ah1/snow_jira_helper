/*


SNOW POST BODY DATA

{"fields":{"project":{"id":"${Jira_ProjectID}"},"summary":"${summary}","description":"${description}", "${SNOW_IncidentID_Jira_FieldID}": "${SNOW_IncidentID}","${SNOW_SysID_Jira_FieldID}":"${SNOW_SysID}","issuetype":{"id":"${Jira_IssueTypeID}"}}}

*/


function getOneIssueFromJira() {
    var requestBody = ""; 
    
    var IssueKeyOrID = document.getElementById("shortDesc").value ;
    
    var URL = "https://YOUR_INSTANCE.atlassian.net/rest/api/2/issue/" + IssueKeyOrID
    
    printResponse(-1, "Issued a GET request : " + URL + ", waiting for response...") ;

    var client=new XMLHttpRequest();
    //client.open("get","https://YOUR_INSTANCE.atlassian.net/rest/api/2/issue/IN-1");
    client.open("get", URL);

    client.setRequestHeader('Accept','application/json');
    client.setRequestHeader('Content-Type','application/json');

    //Eg. UserName="admin", Password="admin" for this code sample. //Here I am using the API key
    client.setRequestHeader('Authorization', 'Basic '+btoa('YOUR_EMAIL@ISP.COM'+':'+'deQPFxSbk298jlaalsdjf82l1OObUaBC0wcF72B'));

    client.onreadystatechange = function() { 
        if(this.readyState == this.DONE) {
            //document.getElementById("response").innerHTML=this.status + this.response; 
            printResponse(this.status, this.response) ;
        }
    }; 
    client.send(requestBody);
    
    
}


function getAllIssuesFromJira() {
    var requestBody = ""; 

    var client=new XMLHttpRequest();
    //client.open("get","https://novahw.atlassian.net/rest/api/2/issue/IN-1");
    client.open("get","https://YOUR_INSTANCE.atlassian.net/rest/api/2/search?jql=project=Warranty&maxResults=1000");

    client.setRequestHeader('Accept','application/json');
    client.setRequestHeader('Content-Type','application/json');

    //Eg. UserName="admin", Password="admin" for this code sample.
    client.setRequestHeader('Authorization', 'Basic '+btoa('YOUR_EMAIL@ISP.COM'+':'+'deQPFxSbk298jlaalsdjf82l1OObUaBC0wcF72B'));

    client.onreadystatechange = function() { 
        if(this.readyState == this.DONE) {
            //document.getElementById("response").innerHTML=this.status + this.response; 
            printResponse(this.status, this.response) ;
        }
    }; 
    client.send(requestBody);
    
    
}

function defGetJIRAMetaData() {
    
    var requestBody = ""; 

    var client=new XMLHttpRequest();
    //client.open("get","https://YOUR_INSTANCE.atlassian.net/rest/api/2/issue/IN-1");
    client.open("get","https://YOUR_INSTANCE.atlassian.net/rest/api/2/issue/createmeta");

    client.setRequestHeader('Accept','application/json');
    client.setRequestHeader('Content-Type','application/json');

    //Eg. UserName="admin", Password="admin" for this code sample.
    client.setRequestHeader('Authorization', 'Basic '+btoa('YOUR_EMAIL@ISP.COM'+':'+'deQPFxSbk298jlaalsdjf82l1OObUaBC0wcF72B'));

    client.onreadystatechange = function() { 
        if(this.readyState == this.DONE) {
            //document.getElementById("response").innerHTML=this.status + this.response; 
            printResponse(this.status, this.response) ;
        }
    }; 
    client.send(requestBody);
}

function defPostIssueToJira() {
    
    document.getElementById("response").innerHTML = "" ;
    console.log("Inside JIRA post issue") ;
    var shortDesc = document.getElementById("shortDesc").value ;
    var assGroup = document.getElementById("assGroup").value ;
    var contact_type = document.getElementById("contact_type").value ;
    
    //var requestBody = "{\"short_description\":\" Posted Incident2\",\"assignment_group\":\"Software\"}";
    //var requestBody = "{\"short_description\":\"" + shortDesc + "\",\"assignment_group\":\"" + assGroup + "\",\"contact_type\":\"" + contact_type + "\"}" ;
    
    //SNOW_IncidentID  : customfield_10027
    //SNOW_SysID            : customfield_10026
    
    var rrbody = {
        "fields": {
            "project": {
                "id" : "10002"
            },
            "summary" : "<SUMMARY>",
            "description": "<DESCRIPTION>",
            "customfield_10027" : "24e23c8d4fk34lakdf027c4b82ca310c7a6",
            "customfield_10028" : "INC0020011",
            "issuetype": {
                "id": "10001"
            },
            
        }
    };
    
  
    var rbody = JSON.stringify(rrbody).replace("<SUMMARY>", assGroup).replace("<DESCRIPTION>", shortDesc) ;
  
    printResponse(-1, rbody) ;
     
    var requestBody = rbody; //JSON.stringify(rbody) ;
    //alert(requestBody) ;
    //exit() ;

    var client=new XMLHttpRequest();
    client.open("post","https://YOUR_INSTANCE.atlassian.net/rest/api/2/issue");

    client.setRequestHeader('Accept','application/json');
    client.setRequestHeader('Content-Type','application/json');
    client.setRequestHeader('X-Atlassian-Token', 'no-check') ;

    //Eg. UserName="admin", Password="admin" for this code sample.
    client.setRequestHeader('Authorization', 'Basic '+btoa('YOUR_EMAIL@ISP.COM'+':'+'deQPFxSbk298jlaalsdjf82l1OObUaBC0wcF72B'));

    client.onreadystatechange = function() { 
        if(this.readyState == this.DONE) {
            //document.getElementById("response").innerHTML=this.status + this.response; 
            printResponse(this.status, this.response) ;
        }
    }; 
    client.send(requestBody);
    
}

function defUpdateSNOWIncident(){
    
    /*
    New 		1
    Inprogress 	2
    On Hold		3
    Resolved	6
    Closed		7
    Canceled	8
    */
    
    var shortDesc = document.getElementById("shortDesc").value ;
    var assGroup = document.getElementById("assGroup").value ;
    var state = document.getElementById("contact_type").value ;
    
    
    //var rbody = "{\"description\":\"<ASSGROUP>\",\"short_description\":\"<SHORTDESCRIPTION>\"}"; 
    
    //var requestBody = "{\"description\":\"" + assGroup + "\",\"short_description\":\"" + shortDesc + "\", \"state\":\"" + state + "\"}" ;
    var requestBody = "{\"state\":\"" + state + "\"}" ;
    
    printResponse(-1, requestBody) ;
    
    //return ;

    var client=new XMLHttpRequest();
    client.open("put","https://YOUR_INSTANCE.service-now.com/api/now/table/incident/<SYS_ID>");

    client.setRequestHeader('Accept','application/json');
    client.setRequestHeader('Content-Type','application/json');

    //Eg. UserName="admin", Password="admin" for this code sample.
    client.setRequestHeader('Authorization', 'Basic '+btoa('admin'+':'+'YOUR_PASSWORD'));

    client.onreadystatechange = function() { 
        if(this.readyState == this.DONE) {
            //document.getElementById("response").innerHTML=this.status + this.response; 
            printResponse(this.status, this.response) ;
        }
    }; 
    client.send(requestBody);
    
}

function defUpdateSNOWIncidentWithScriptedAPI_put(){
    
    /*
    New 		1
    Inprogress 	2
    On Hold		3
    Resolved	6
    Closed		7
    Canceled	8
    */
    
    var shortDesc = document.getElementById("shortDesc").value ;
    var assGroup = document.getElementById("assGroup").value ;
    var state = document.getElementById("contact_type").value ;
    
    var requestBody = "" ;
    //var rbody = "{\"description\":\"<ASSGROUP>\",\"short_description\":\"<SHORTDESCRIPTION>\"}"; 
    
    //var requestBody = "{\"description\":\"" + assGroup + "\",\"short_description\":\"" + shortDesc + "\", \"state\":\"" + state + "\"}" ;
    
    //printResponse(-1, requestBody) ;
    //eb4636ca6f6e31005be8783e6b3ee333
    //ec9e223c4f60230027c4b82ca310c730
    ///https://YOUR_INSTANCE.service-now.com/api/261654/v2/fromjiraput
    //return ;

    var client=new XMLHttpRequest();
    client.open("put","https://YOUR_INSTANCE.service-now.com/api/261654/v1/fromjiraput?sysid=ec9e223c4f60230027c4b82ca310c730&state=6");

    client.setRequestHeader('Accept','application/json');
    client.setRequestHeader('Content-Type','application/json');

    //Eg. UserName="admin", Password="admin" for this code sample.
    client.setRequestHeader('Authorization', 'Basic '+btoa('admin'+':'+'YOUR_PASSWORD'));

    client.onreadystatechange = function() { 
        if(this.readyState == this.DONE) {
            //document.getElementById("response").innerHTML=this.status + this.response; 
            printResponse(this.status, this.response) ;
        }
    }; 
    client.send(requestBody);
    printResponse(-1, "Request sent with state 6, waiting for updated response") ;
    
}

function defPostIncidentToSNOW() {
    
    document.getElementById("response").innerHTML = "" ;
    console.log("Inside post incident") ;
    var shortDesc = document.getElementById("shortDesc").value ;
    var assGroup = document.getElementById("assGroup").value ;
    var contact_type = document.getElementById("contact_type").value ;
    
    //var requestBody = "{\"short_description\":\" Posted Incident2\",\"assignment_group\":\"Software\"}"; 
    var requestBody = "{\"short_description\":\"" + shortDesc + "\",\"assignment_group\":\"" + assGroup + "\",\"contact_type\":\"" + contact_type + "\"}" ;
    alert(requestBody) ;
    //exit() ;

    var client=new XMLHttpRequest();
    client.open("post","https://YOUR_INSTANCE.service-now.com/api/now/table/incident?sysparm_fields=assignment_group");

    client.setRequestHeader('Accept','application/json');
    client.setRequestHeader('Content-Type','application/json');

    //Eg. UserName="admin", Password="admin" for this code sample.
    client.setRequestHeader('Authorization', 'Basic '+btoa('admin'+':'+'YOUR_PASSWORD'));

    client.onreadystatechange = function() { 
        if(this.readyState == this.DONE) {
            //document.getElementById("response").innerHTML=this.status + this.response; 
            printResponse(this.status, this.response) ;
        }
    }; 
    client.send(requestBody);
} ;

function defGetIncidentsFromSnow(){
    
    document.getElementById("response").innerHTML = "" ;
    var requestBody = ""; 

    var client=new XMLHttpRequest();
    client.open("get","https://YOUR_INSTANCE.service-now.com/api/now/table/incident?sysparm_query=active%3Dtrue%5EORDERBYDESCnumber%5EORDERBYDESCcategory&sysparm_fields=number%2Cshort_description%2Cassignment_group%2Ccontact_type&sysparm_limit=10");

    client.setRequestHeader('Accept','application/json');
    client.setRequestHeader('Content-Type','application/json');

    //Eg. UserName="admin", Password="admin" for this code sample.
    client.setRequestHeader('Authorization', 'Basic '+btoa('admin'+':'+'YOUR_PASSWORD'));

    client.onreadystatechange = function() { 
        if(this.readyState == this.DONE) {
            //document.getElementById("response").innerHTML=this.status + this.response; 
            printResponse(this.status, this.response) ;
        }
    }; 
    client.send(requestBody);
};

function printResponse(status, response){
    
  //document.getElementById("response").innerHTML = "Status : " + status + "<hr>" + JSON.stringify(response, undefined, 5) ;
  //document.getElementById("response").innerHTML = "Status : " + status + "<hr>" + JSON.parse(response.result) ;
  
  
  document.getElementById("response").innerHTML = "Status : " + status + "<hr>" + response ;
    
}