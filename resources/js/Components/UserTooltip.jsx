import { Avatar, Link, styled } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import React from 'react';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#ffffff',
        color: '#333',
        maxWidth: 250,
        fontSize: theme.typography.pxToRem(14),
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
        padding: theme.spacing(2),
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: '#ffffff',
    },
}));

const UserTooltip = ({ user }) => {
    // Supposons que `user.phones` est une chaîne JSON. On la parse ici.
    let phones = [];
    try {
        phones = JSON.parse(JSON.parse(user.phones) );
    } catch (error) {
        phones = [user.phones]; // Si l'objet n'est pas parsé, on le laisse sous forme de tableau avec un seul élément.
    }

    return (
        <HtmlTooltip
            title={
                <div className="flex flex-col">
                    <div className="mb-2 flex items-center">
                        {/* Avatar avec une couleur de fond ou une image utilisateur */}
                        <Avatar className="mr-2 h-10 w-10 bg-blue-100 text-blue-500">
                            {/* Si l'utilisateur a une image, afficher l'image */}
                            {user.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt="Avatar"
                                    className="h-full w-full rounded-full object-cover"
                                />
                            ) : (
                                <span>{user.prenoms.charAt(0)}</span> // Initiale de l'utilisateur en cas d'absence d'image
                            )}
                        </Avatar>
                        <strong className="text-lg">
                            {user.nom} {user.prenoms}
                        </strong>
                    </div>
                    <p className="text-sm text-gray-600">Email: {user.email}</p>
                    <div className="text-sm text-gray-600">
                        <strong>Téléphone(s):</strong>
                        {phones.length > 0 ? (
                            phones.map((phone, index) => (
                                <p key={index}>{phone}</p> // Parcours du tableau pour afficher chaque numéro de téléphone
                            ))
                        ) : (
                            <p>Aucun téléphone disponible</p>
                        )}
                    </div>
                </div>
            }
            arrow
        >
            <Link
                href={route('clients.show', user.id)}
                className="font-medium text-blue-600 hover:underline"
            >
                {user.prenoms}
            </Link>
        </HtmlTooltip>
    );
};

export default UserTooltip;
