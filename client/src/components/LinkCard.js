import React from 'react'


export const LinkCard = ({ link }) => {
    return (
        <>
            <h2>Link/URL</h2>
            <p>Shortened: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>Source: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Clicks: <strong>{link.clicks}</strong></p>
            <p>Create date: <strong>{new Date (link.date).toLocaleDateString()}</strong></p>
        </>
    )
}