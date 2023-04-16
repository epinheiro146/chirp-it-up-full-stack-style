import * as React from "react";
import { useState, useEffect } from "react";
import { Chirp } from "../../types";
import { Link } from "react-router-dom";
import { fetcher } from "../services/fetch-helper";
import swal from "sweetalert";

const Timeline = () => {
    const [chirps, setChirps] = useState<Chirp[]>([]);

    useEffect(() => {
        fetcher(`/api/chirps`)
            .then(data => setChirps(data))
            .catch(error => swal("Oops!", error.message, "error"));
    }, []);

    // the fetcher above replaced the commented code below, and now allows for error handling

    /*useEffect(() => {
        fetch(`/api/chirps`)
            .then(res => res.json())
            .then(data => setChirps(data));
    }, []);*/

    return (
        <div className="mt-5">
            <h1>Timeline</h1>
            {chirps.map(chirp => (
                <div className="col-12 col-md-4 col-lg-3 my-2" key={`chirp-${chirp.id}`}>
                    <Link to={`/chirps/${chirp.id}`}>
                        <div className="card text-bg-dark shadow-lg">
                            <div className="card-title">
                                <p>User #{chirp.userid}</p>
                            </div>
                            <div className="card-body">
                                <p>{chirp.content}</p>
                            </div>
                            <div className="card-footer">
                                <p>{chirp?._created ? `${new Date(chirp?._created).toLocaleString()}` : ""}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
};

export default Timeline;