const txn = ({txn}) => {
    return (
        <div className='txn'>
            <h1>{txn.date}</h1>
            <h2>{txn.type}</h2>
            <h2>{txn.amount}</h2>
            <h3>{txn.brief}</h3>
            <p>{txn.description}</p>
        </div>
    );
}

export default txn;