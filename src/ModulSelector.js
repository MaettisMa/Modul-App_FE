import './App.css';

const ModulSelector = ({chosenDegreeData, handleModulSelector}) => {

    return(
        <div>
            <select 
                className='SelectModule'
                onClick={event => handleModulSelector(event.target.value)}>
                    {chosenDegreeData.map((item) => {
                    return(
                        <option value={item['Modul']}>
                            {item['Modul']}
                        </option>
                    );
                    })
                }
            </select>
        </div>
    );
}

export default ModulSelector