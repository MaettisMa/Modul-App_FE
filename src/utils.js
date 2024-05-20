
export const fetchData = async(path) => {
    const response = await fetch(`http://127.0.0.1:5000${path}` /*'https://jsonplaceholder.typicode.com/todos'*/)
    const jsonData = await response.json();
    return jsonData;
}

export const extractChosenModulData = (chosenModul, chosenDegree) => {
    let array;
    for(let i = 0; i < chosenDegree.length; i++){
        if(chosenModul === chosenDegree[i]['Modul']){
            array = chosenDegree[i];
        }
    }
    return array;
}

export const getModuleIndex = (chosenModul, chosenDegree) => {
    for(let i = 0; i < chosenDegree.length; i++){
        if(chosenModul === chosenDegree[i]['Modul']){
            return i;
        }
    }
}

export const putRequest = async(index, updatedModule, path) => {
    const responsePost = await fetch(`http://127.0.0.1:5000/${path}?id=${index}`,{
        method: 'Put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updatedModule)
    });
}

export const deleteRequest = async(index, path) => {
    const responseDelete = await fetch(`http://127.0.0.1:5000/${path}?id=${index}`,{
        method: 'Delete',
    });
}

export const deleteModule = (index, degreeModules) => {
    degreeModules.splice(index, 1);
    return degreeModules;
}

export const updateDegreeData = (index, 
                                 updatedModule, 
                                 degreeModules) => {

    for(let i = 0; i < degreeModules.length; i++){
        if(i === index){
            degreeModules[i]['Modul'] = updatedModule['Modul'];
            degreeModules[i]['Modulnummer'] = updatedModule['Modulnummer'];
            degreeModules[i]['Art'] = updatedModule['Art'];
            degreeModules[i]['ECTS'] = updatedModule['ECTS'];
            degreeModules[i]['SWS'] = updatedModule['SWS'];
            degreeModules[i]['Prüfungsleistung'] = updatedModule['Prüfungsleistung'];
        }
    }
    return degreeModules;                         
}