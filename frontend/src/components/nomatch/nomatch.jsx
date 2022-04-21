import './nomatch.css'
export default function NoMatch() {
    return (
        <div className="nomatchContainer">
            <h1>Whooops!</h1>
            <h3>404 Not Found</h3>
            <img src="/assets/nomatch.png" alt="nomatch" />
            <p>The Page You are Requesting may be not found or no more exists</p>
            <p>Return to <a href="/home" style={{fontSize: '20pt', fontWeight: 'bold'}}>HomePage</a></p>
        </div>
    )
}