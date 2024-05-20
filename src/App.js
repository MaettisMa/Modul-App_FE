import { useEffect, useState } from 'react';
import { fetchData, 
         extractChosenModulData, 
         getModuleIndex, 
         putRequest,
         deleteRequest,
         updateDegreeData,
         deleteModule,
         appendNewModule,
         postRequest } from './utils';
import DegreeSelector from './DegreeSelector';
import ModulSelector from './ModulSelector';
import ModulManipulator from './ModulManipulator';
import './App.css';

const App = () => {
  
  // data variables
  const [degrees, setDegrees] = useState(['Wähle einen Studiengang']);
  const [chosenDegree, setChosenDegree] = useState('');
  const [chosenDegreeData, setChosenDegreeData] = useState();
  const [chosenModuleData, setChosenModuleData] = useState();
  const [chosenModuleIndex, setChosenModuleIndex] = useState();
  const [showModulManipulator, setShowModulManipulator] = useState(false);
  const [showButtonModuleManipulator, setShowButtonModuleManipulator] = useState(true);
  
  useEffect(() =>{
    const getDegree = async() =>{
      const data = await fetchData('/')
      setDegrees(data);
    }
    getDegree();
  }, []);

  const handleDegreeSelector = async(degree) => {
    setChosenDegree(degree);
    const data = await fetchData(`/${degree}`);
    setChosenDegreeData(data)
  };

  const handleModulSelector = (module) => {
    const data = extractChosenModulData(module, chosenDegreeData);
    setChosenModuleData(data);
    const index = getModuleIndex(module, chosenDegreeData);
    setChosenModuleIndex(index);
    setShowModulManipulator(true);
    setShowButtonModuleManipulator(true);
  };

  const handleSubmitForSave = () => {
    putRequest(chosenModuleIndex, chosenModuleData, chosenDegree);
    const data = updateDegreeData(
                      chosenModuleIndex, 
                      chosenModuleData, 
                      chosenDegreeData
                  )
    setChosenDegreeData(data);
  };

  const handleSubmitForDelete = () => {
    deleteRequest(chosenModuleIndex, chosenDegree);
    const data = deleteModule(chosenModuleIndex, chosenDegreeData);
    setChosenDegreeData(data);
    setChosenModuleData(
      chosenDegreeData[chosenModuleIndex % chosenDegreeData.length]
    );
  }
  
  const handleSubmitForNewModule = () => {
    setChosenModuleData({
      Art: "",
      ECTS: "",
      Modul: "",
      Modulnummer: "",
      Prüfungsleistung: "",
      SWS: ""
    })
    setShowButtonModuleManipulator(false)
  }
  
  const handleSubmitSaveNewModule = () => {
    console.log(chosenModuleData)
    postRequest(chosenDegree, chosenModuleData );
    const data = appendNewModule(chosenModuleData, chosenDegreeData);
    setChosenDegreeData(data);
    setShowButtonModuleManipulator(true);
    setChosenModuleData(chosenDegreeData[chosenDegreeData.length - 1]);
    setChosenModuleIndex(chosenDegreeData.length)
  }

  return (
    <div className="App">
      <header className='Header'>
        <h2>App der Module</h2>
      </header>
      <div className='MenuWrapper'>
        <div className='SelectionWrapper'>
          <DegreeSelector 
            degrees={degrees} 
            handleDegreeSelector={handleDegreeSelector}/>
          {chosenDegreeData !== undefined &&
            <ModulSelector 
              chosenDegreeData={chosenDegreeData}
              handleModulSelector={handleModulSelector}/>
          }
        </div>
        {chosenDegree !== '' &&
          <div className='DegreeSelection'>Studiengang: &nbsp;
              <h4>{chosenDegree}</h4>
          </div>
        }
        {chosenModuleData !== undefined &&
          <div className='ModuleSelection'>Module: &nbsp;
              <h4>{chosenModuleData['Modul']}</h4>
          </div>
        }
      </div>
      <div className='DataWrapper'>
        {showModulManipulator === true &&
          <ModulManipulator 
            chosenModuleData={chosenModuleData} 
            handleSubmitForSave={handleSubmitForSave}
            setChosenModuleData={setChosenModuleData}
            handleSubmitForDelete={handleSubmitForDelete}
            handleSubmitForNewModule={handleSubmitForNewModule}
            showButtonModuleManipulator={showButtonModuleManipulator}
            handleSubmitSaveNewModule={handleSubmitSaveNewModule}/>
        }
      </div>
    </div>
  );
}

export default App;
   