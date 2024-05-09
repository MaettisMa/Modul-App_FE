import { useEffect, useState } from 'react';
import { fetchData, 
         extractChosenModulData, 
         getModuleIndex, 
         putRequest,
         updateDegreeData } from './utils';
import DegreeSelector from './DegreeSelector';
import ModulSelector from './ModulSelector';
import ModulManipulator from './ModulManipulator';
import './App.css';

const App = () => {
  
  const [degrees, setDegrees] = useState(['Wähle einen Studiengang']);
  const [chosenDegree, setChosenDegree] = useState('');
  const [chosenDegreeData, setChosenDegreeData] = useState();
  const [chosenModuleData, setChosenModuleData] = useState();
  const [chosenModuleIndex, setChosenModuleIndex] = useState();
  const [showModulManipulator, setShowModulManipulator] = useState(false);
  
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
  };

  const handleSubmitForSave = (submittedData) => {
    putRequest(chosenModuleIndex, chosenModuleData, chosenDegree);
    const data = updateDegreeData(chosenModuleIndex, chosenModuleData, chosenDegreeData)
    setChosenDegreeData(data);
  };
  
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
            setChosenModuleData={setChosenModuleData}/>
        }
      </div>
    </div>
  );
}

export default App;
   