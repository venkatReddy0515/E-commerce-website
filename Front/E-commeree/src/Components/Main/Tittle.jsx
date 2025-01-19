import "./Home.css"
function Tittle({tittle1,tittle2}){
    return(
        <>
            <div>
                    <div className="heading">
                        <h1>{tittle1} {tittle2}</h1>
                        <p className="line"></p>
                    </div>
            </div>
        </>
    )
}
export default Tittle