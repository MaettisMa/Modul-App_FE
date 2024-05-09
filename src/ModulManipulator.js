import './App.css';

const ModulManipulator = ({chosenModuleData, handleSubmitForSave, setChosenModuleData}) => {
    
    const setModuleName = (data) => {
        setChosenModuleData({
            ...chosenModuleData,
            Modul: data
        });
    };

    const setModuleNumber = (data) => {
        setChosenModuleData({
            ...chosenModuleData,
            Modulnummer: data
        });
    };

    const setModuleType = (data) => {
        setChosenModuleData({
            ...chosenModuleData,
            Art: data
        });
    };

    const setModuleEcts = (data) => {
        setChosenModuleData({
            ...chosenModuleData,
            ECTS: data
        });
    };

    const setModuleSws = (data) => {
        setChosenModuleData({
            ...chosenModuleData,
            SWS: data
        });
    };

    const setModuleExam = (data) => {
        setChosenModuleData({
            ...chosenModuleData,
            Prüfungsleistung: data
        });
    };

    return(
        <>
            <div className='InputModuleName'>
                <div>Modulname</div>
                <input
                    className='ModuleInput' 
                    value={chosenModuleData['Modul']}
                    onChange={event => setModuleName(event.target.value)}>
                </input>
            </div>
            <div className='InputModuleNumber'>
                <div>Modulnummer</div>
                <input
                    className='ModuleInput' 
                    value={chosenModuleData['Modulnummer']}
                    onChange={event => setModuleNumber(event.target.value)}>
                </input>
            </div>
            <div className='InputModuleType'>
                <div>Modulart</div>
                <input
                    className='ModuleInput' 
                    value={chosenModuleData['Art']} 
                    onChange={event => setModuleType(event.target.value)}>
                </input>
            </div>
            <div className='ModuleEcts'>
                <div>ECTS</div>
                <input
                    className='ModuleInput' 
                    value={chosenModuleData['ECTS']}
                    onChange={event => setModuleEcts(event.target.value)}>
                </input>
            </div>
            <div className='ModuleSws'>
                <div>Semesterwochenstunden</div>
                <input
                    className='ModuleInput' 
                    value={chosenModuleData['SWS']}
                    onChange={event => setModuleSws(event.target.value)}>
                </input>
            </div>
            <div className='ModuleExam'>
                <div>Prüfungsleistung</div>
                <input
                    className='ModuleInput' 
                    value={chosenModuleData['Prüfungsleistung']}
                    onChange={event => setModuleExam(event.target.value)}>
                </input>
            </div>
            <div className='SaveButton'>
                <button 
                    onClick={event => handleSubmitForSave(event.target.value)}>
                        Speichern
                </button>
            </div>        
        </>
    );
}

export default ModulManipulator