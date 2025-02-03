'use client';

export default function Error({ error, reset }) {
    return (
        <div>
            <h1>Oops! An error occurred.</h1>
            <p>{error.message}</p>
            <button onClick={reset}>Try Again</button>
        </div>
    );
}
