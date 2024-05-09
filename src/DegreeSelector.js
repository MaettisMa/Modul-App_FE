import './App.css';

const DegreeSelector = ({degrees, handleDegreeSelector}) => {

    return(
        <div>
            <select className='SelectDegree' 
                    onClick={event => handleDegreeSelector(event.target.value)}>
                {degrees !== undefined && 
                    degrees.map((item, index) => {
                        return(
                        <option value={item['Studiengang']} id={index}>
                            {item['Studiengang']}
                        </option>
                        );
                    })
                }
            </select>
        </div>
    );
}

export default DegreeSelector