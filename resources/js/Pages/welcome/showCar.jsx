import AvisComponent from '@/Components/AvisComponent';
import ConfirmModal from '@/Components/ConfirmModal';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import ReservationModal from '@/Components/ReservationModal';
import SecondaryButton from '@/Components/SecondaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { CarRentalOutlined, Fullscreen } from '@mui/icons-material';
import { Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

function Showvehicule({ vehicule, auth }) {
    const [imagePreviews, setImagePreviews] = useState([]);
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [reservationModalOpen, setReservationModalOpen] = useState(false);
    const [avisModalOpen, setAvisModalOpen] = useState(false);
    const [avisDeleteModalOpen, setAvisDeleteModalOpen] = useState(false);
    const { deletReq: deleteRequest } = useForm();
    const handleOpenReservationModal = (car) => {
        setReservationModalOpen(true);
    };

    const handleCloseReservationModal = () => {
        setReservationModalOpen(false);
    };

    useEffect(() => {
        if (vehicule.images) {
            const decodedImages = JSON.parse(vehicule.images);
            const previews = decodedImages.map((image) => `/storage/${image}`);
            setImagePreviews(previews);
        }
    }, [vehicule.images]);

    const openImageModal = (index) => {
        setActiveIndex(index);
        setImageModalOpen(true);
    };

    const closeImageModal = () => {
        setImageModalOpen(false);
    };

    const showPrevImage = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? imagePreviews.length - 1 : prevIndex - 1,
        );
    };

    const showNextImage = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === imagePreviews.length - 1 ? 0 : prevIndex + 1,
        );
    };

    const thumbnailContainerRef = useRef(null);
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) =>
                prevIndex === imagePreviews.length - 1 ? 0 : prevIndex + 1,
            );
        }, 3000); // Changer toutes les 3 secondes

        return () => clearInterval(interval); // Nettoyer l'intervalle lorsqu'on quitte le composant
    }, [imagePreviews.length]);

    useEffect(() => {
        if (thumbnailContainerRef.current) {
            const container = thumbnailContainerRef.current;
            const activeThumbnail = container.children[activeIndex];

            if (activeThumbnail) {
                // Scroller le conteneur des miniatures uniquement
                activeThumbnail.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'center',
                    block: 'nearest',
                });
            }
        }
    }, [activeIndex]);

    const userExistingAvis = vehicule.avis.find(
        (avisItem) => avisItem.user_id === auth.user.id,
    );
    return (
        <GuestLayout auth={auth} footerShown={false}>
            <Head title={`Véhicule ${vehicule.marque} ${vehicule.modele}`} />
            <ReservationModal
                open={reservationModalOpen}
                handleClose={handleCloseReservationModal}
                car={vehicule}
                isAuthenticated={auth.user ? true : false}
            />
            <AvisComponent
                vehicule={vehicule}
                userId={auth.user?.id} // Utilisation de l'id de l'utilisateur authentifié
                isModalOpen={avisModalOpen} // Vous pouvez ajuster l'état du modal pour l'avis si nécessaire
                setIsModalOpen={() => {
                    setAvisModalOpen(false);
                }}
                userExistingAvis={userExistingAvis}
                selectedAvisId={null} // Vous pouvez ajouter un id d'avis sélectionné si nécessaire
            />

            <ConfirmModal
                open={avisDeleteModalOpen}
                onClose={() => setAvisDeleteModalOpen(false)}
                title="Supprimer l'avis"
                content="Êtes-vous sûr de vouloir supprimer cet avis ?"
                onConfirm={() => {
                    router.delete(
                        `/vehicules/${vehicule.id}/avis/${userExistingAvis.id}`,
                        {
                            onSuccess: () => {
                                setAvisDeleteModalOpen(false); // Close the modal after deleting
                                // Close the form modal if open
                            },
                            onError: (errors) => {
                                console.error('Error deleting review:', errors);
                                alert(
                                    'Une erreur est survenue. Veuillez réessayer.',
                                );
                            },
                        },
                    );
                    setAvisDeleteModalOpen(false);
                }}
            />
            <div className="mx-auto space-y-5 bg-gray-50 p-6 py-24">
                <div className="rounded-lg p-6 transition-transform duration-300">
                    <div className="flex h-full flex-col">
                        <div className="flex space-x-4">
                            {/* Section de l'image principale avec le carrousel sur le côté */}
                            <div className="flex h-80 w-4/5 space-x-4 md:w-2/3 lg:w-3/5 xl:w-1/2">
                                {/* Carrousel des miniatures sur la gauche */}
                                {/* Image principale */}
                                <div className="group relative h-full flex-1 overflow-hidden">
                                    <motion.div
                                        key={activeIndex}
                                        className="group relative h-full w-full"
                                        initial={{ y: 100, opacity: 0 }} // Effet de slide-up
                                        animate={{ y: 0, opacity: 1 }} // Retour à sa position normale
                                        exit={{ y: -100, opacity: 0 }} // Animation de sortie
                                        transition={{ duration: 0.5 }}
                                    >
                                        <img
                                            src={
                                                imagePreviews[activeIndex] ||
                                                `/storage/${JSON.parse(vehicule.images)[0]}`
                                            }
                                            alt="Image du véhicule"
                                            className="h-full w-full rounded-md object-cover shadow-md hover:shadow-lg"
                                        />
                                    </motion.div>
                                    {/* Icône en plein écran avec animation Fade-Up */}
                                    <div className="absolute inset-0 flex items-center justify-center rounded-sm bg-black bg-opacity-40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <div className="translate-y-4 transform opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                            <button
                                                onClick={() =>
                                                    openImageModal(activeIndex)
                                                }
                                            >
                                                <Fullscreen
                                                    className="h-14 text-white"
                                                    fontSize="large"
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Navigation avec chevron */}
                                    {imagePreviews.length > 1 && (
                                        <div className="absolute bottom-5 right-0 flex space-x-2 p-2">
                                            {/* Bouton Précédent */}
                                            <button
                                                onClick={() =>
                                                    setActiveIndex((prev) =>
                                                        Math.max(prev - 1, 0),
                                                    )
                                                }
                                                disabled={activeIndex === 0}
                                                className="rounded-full bg-white p-2 shadow-lg hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <ChevronLeft />
                                            </button>

                                            {/* Bouton Suivant */}
                                            <button
                                                onClick={() =>
                                                    setActiveIndex((prev) =>
                                                        Math.min(
                                                            prev + 1,
                                                            imagePreviews.length -
                                                                1,
                                                        ),
                                                    )
                                                }
                                                disabled={
                                                    activeIndex ===
                                                    imagePreviews.length - 1
                                                }
                                                className="rounded-full bg-white p-2 shadow-lg hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <ChevronRight />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {/* Carrousel des miniatures */}
                                <div className="mr-8 flex flex-col items-center">
                                    <div
                                        ref={thumbnailContainerRef} // Attachez la ref au conteneur
                                        className="flex h-80 flex-col items-start gap-2 overflow-hidden rounded-md"
                                    >
                                        {imagePreviews.map((image, index) => (
                                            <div
                                                key={index}
                                                className="group relative flex-shrink-0"
                                            >
                                                <img
                                                    src={image}
                                                    alt={`Miniature ${index}`}
                                                    className={`h-20 w-20 cursor-pointer rounded-sm object-cover transition-transform duration-300 ${
                                                        index === activeIndex
                                                            ? 'border-4 border-blue-500'
                                                            : 'border'
                                                    }`}
                                                    onClick={() =>
                                                        setActiveIndex(index)
                                                    }
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Section des miniatures d'images */}

                            {/* Section des détails du véhicule */}
                            <div className="flex flex-1 flex-col overflow-auto rounded-md bg-white p-4 shadow-lg">
                                <div>
                                    <h2 className="mb-4 text-3xl font-bold text-gray-800">
                                        {vehicule.marque} / {vehicule.modele}
                                    </h2>
                                    <div className="grid grid-cols-2 gap-4 text-gray-700">
                                        {/* <div className="col-span-2 flex justify-between">
                                            <p>
                                                <strong>
                                                    Immatriculation:
                                                </strong>
                                            </p>
                                            <p>{vehicule.immatriculation}</p>
                                        </div> */}
                                        <div className="col-span-2 flex justify-between">
                                            <p>
                                                <strong>Vitesse:</strong>
                                            </p>
                                            <p>{vehicule.vitesse} km/h</p>
                                        </div>
                                        <div className="col-span-2 flex justify-between">
                                            <p>
                                                <strong>Catégorie:</strong>
                                            </p>
                                            <p>
                                                {vehicule.categorie
                                                    ? vehicule.categorie.nom
                                                    : 'Non définie'}
                                            </p>
                                        </div>
                                    </div>
                                    <Divider sx={{ marginTop: 2 }} />
                                    <p className="mt-4 text-gray-600">
                                        {vehicule.description}
                                    </p>

                                    {/* Affichage de la note moyenne */}
                                    {vehicule.avis.length > 0 && (
                                        <div className="mt-4 flex items-center">
                                            <span className="font-semibold text-gray-600">
                                                Note:{' '}
                                            </span>
                                            <span className="ml-2 text-yellow-500">
                                                {(() => {
                                                    const totalRating =
                                                        vehicule.avis.reduce(
                                                            (acc, avisItem) =>
                                                                acc +
                                                                avisItem.note,
                                                            0,
                                                        );
                                                    const averageRating =
                                                        totalRating /
                                                        vehicule.avis.length;
                                                    const roundedRating =
                                                        averageRating.toFixed(
                                                            1,
                                                        );
                                                    const fullStars =
                                                        Math.floor(
                                                            roundedRating,
                                                        );
                                                    const emptyStars =
                                                        5 - fullStars;
                                                    return (
                                                        <span>
                                                            {'★'.repeat(
                                                                fullStars,
                                                            )}
                                                            {'☆'.repeat(
                                                                emptyStars,
                                                            )}
                                                            <span className="ml-2 text-gray-600">
                                                                ({roundedRating}
                                                                )
                                                            </span>
                                                        </span>
                                                    );
                                                })()}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-grow" />

                                {/* Bouton de réservation */}
                                <div className="mt-auto flex w-full justify-end space-x-4 self-end">
                                    {auth?.user?.type !== 'admin' && (
                                        <PrimaryButton
                                            onClick={() =>
                                                handleOpenReservationModal(
                                                    vehicule,
                                                )
                                            }
                                            className="flex items-center space-x-2"
                                        >
                                            <CarRentalOutlined /> Réserver
                                        </PrimaryButton>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {vehicule.unavailableDates &&
                    vehicule.unavailableDates.length > 0 && (
                        <div className="my-4 rounded-md border border-red-300 bg-red-100 p-4">
                            <h4 className="font-semibold text-red-600">
                                Non disponible du :
                            </h4>
                            <ul className="list-disc pl-6 text-gray-700">
                                {vehicule.unavailableDates.map(
                                    (dateRange, idx) => (
                                        <li key={idx}>
                                            {dateRange.start} à {dateRange.end}
                                        </li>
                                    ),
                                )}
                            </ul>
                        </div>
                    )}

                <div className="bg-white p-5">
                    <div className="bg-white p-5">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">
                                Avis sur le véhicule
                            </h3>

                            {/* Conditionally display buttons based on if the user has already provided a review */}
                            {vehicule.avis.length > 0 ? (
                                vehicule.avis.map((avisItem) => (
                                    <div
                                        key={avisItem.id}
                                        className="mb-4 mt-5 border-b"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold">
                                                {avisItem.user.nom}
                                            </span>

                                            <div className="flex h-full flex-col items-end justify-between text-sm text-gray-500">
                                                {new Date(
                                                    avisItem.created_at,
                                                ).toLocaleDateString('fr-FR', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                                <span className="mt-4 text-yellow-500">
                                                    {'★'.repeat(avisItem.note)}
                                                    {'☆'.repeat(
                                                        5 - avisItem.note,
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-gray-700">
                                            {avisItem.commentaire}
                                        </p>
                                        {}
                                        {/* Si l'avis appartient à l'utilisateur actuel, afficher les boutons Modifier et Supprimer */}
                                        {avisItem.user.id == auth.user.id ? ( // Remplacez 'user123' par l'ID de l'utilisateur connecté
                                            <div className="my-4 flex space-x-4">
                                                <PrimaryButton
                                                    className="rounded bg-blue-500 px-4 py-2 text-white"
                                                    onClick={() =>
                                                        setAvisModalOpen(true)
                                                    }
                                                >
                                                    Modifier
                                                </PrimaryButton>
                                                <SecondaryButton
                                                    onClick={() =>
                                                        setAvisDeleteModalOpen(
                                                            true,
                                                        )
                                                    }
                                                    isSticky
                                                    className="rounded bg-red-500 px-4 py-2 text-white"
                                                >
                                                    Supprimer
                                                </SecondaryButton>
                                            </div>
                                        ) : null}
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600">
                                    <PrimaryButton
                                        className="rounded bg-blue-500 px-4 py-2 text-white"
                                        onClick={() => setAvisModalOpen(true)}
                                    >
                                        Ajoutez votre avis sur le véhicule
                                    </PrimaryButton>
                                </p>
                            )}
                        </div>

                        <div className="mt-4">
                            {vehicule.avis.length > 0 ? (
                                vehicule.avis.map((avisItem) => (
                                    <div
                                        key={avisItem.id}
                                        className="border-b py-3"
                                    >
                                        <div className="flex justify-between">
                                            <span className="font-semibold">
                                                {avisItem.user.nom}
                                            </span>

                                            <div className="flex h-full flex-col items-end justify-between text-sm text-gray-500">
                                                {new Date(
                                                    avisItem.created_at,
                                                ).toLocaleDateString('fr-FR', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                                <span className="mt-4 text-yellow-500">
                                                    {'★'.repeat(avisItem.note)}
                                                    {'☆'.repeat(
                                                        5 - avisItem.note,
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-gray-600">
                                            {avisItem.commentaire}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p>Aucun avis disponible pour ce véhicule.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                show={imageModalOpen}
                onClose={() => setImageModalOpen(false)}
            >
                <button
                    onClick={closeImageModal}
                    className="absolute right-6 top-6 text-2xl text-gray-800 hover:text-gray-500"
                >
                    ✕
                </button>
                <div className="relative w-full rounded-lg bg-white p-4 shadow-lg">
                    <img
                        src={imagePreviews[activeIndex]}
                        alt={`Image ${activeIndex}`}
                        className="h-full w-full rounded-md"
                    />
                    <button
                        onClick={showPrevImage}
                        className="absolute left-8 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-lg hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        onClick={showNextImage}
                        className="absolute right-8 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md transition hover:bg-gray-200"
                    >
                        <ChevronRight />
                    </button>
                </div>
            </Modal>
            {/* {imageModalOpen && (
              
            )} */}
        </GuestLayout>
    );
}

export default Showvehicule;
