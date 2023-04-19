import * as React from "react";
import { useState, useEffect } from "react";
import { UserWMentions } from "../../types";
import { useParams, Link } from "react-router-dom";
import { fetcher } from "../services/fetch-helper";
import swal from "sweetalert";

const Profile = () => {

    const [user, setUser] = useState<UserWMentions>();
    const [mentions, setMentions] = useState<UserWMentions[]>([]);
    const { id } = useParams();

    useEffect(() => {
        fetcher(`/api/users/mentions/${id}`)
            .then(data => {
                setUser(data[0]);
                setMentions(data)
            })
            .catch(error => swal("Oops!", error.message, "error"));
    }, [id]);

    return (
        <div className="mt-5">
            <h1>{user?.name}</h1>
            <h5>user#{user?.id}</h5>
            <p>Member since {user?._created ? `${new Date(user?._created).toLocaleString()}` : ""}</p>

            {mentions.map(chirp => (
                <div className="col-12 col-md-4 col-lg-3 my-2" key={`chirp-${chirp.chirpid}`}>

                    <div className="card text-bg-dark shadow-lg">
                        <Link className="text-light text-decoration-none" to={`/users/${chirp.chirp_author_id}`}>
                            <div className="card-title">
                                <p>{chirp.chirp_author_name}:</p>
                            </div>
                        </Link>
                        <Link className="text-light text-decoration-none" to={`/chirps/${chirp.chirpid}`}>
                            <div className="card-body">
                                <p>{chirp.content}</p>
                            </div>
                            <div className="card-footer">
                                <p>{chirp.chirp_created ? `${new Date(chirp.chirp_created).toLocaleString()}` : ""}</p>
                            </div>
                        </Link>
                    </div>
                </div>
            ))}

        </div>
    )

};

export default Profile;

/*

*/