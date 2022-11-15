

export const Philosopher = ({ philosopher, savePhilosopher, favPhilo }) => {
    const currentPhilosopher = favPhilo.find(listPhilosopher => {
        return philosopher.id === listPhilosopher.philosopherId
    })


    return <section className="philosopher">
        {!currentPhilosopher ? <>
            <div className="philoCard">
                <div className="philoDetails">
                    <h2 className="philoName">{philosopher?.name}</h2>
                    <h2 className="philoLife">{philosopher?.Life}</h2>
                    <h3 className="philoSchool"> School of Thought: {philosopher?.school}</h3>

                </div>
                <div>
                    <img key={philosopher.id} src={philosopher.imageURL}
                        alt="philosopher pics" width="100" height="200" />
                </div>
            </div>

            < button onClick={() => {
                savePhilosopher(philosopher)


            }}>save</button></> : <></>
        }



    </section >
}

