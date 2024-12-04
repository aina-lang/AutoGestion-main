import { useForm } from '@inertiajs/react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import React from 'react';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

const AvisComponent = ({
    vehicule,
    userId,
    isModalOpen,
    setIsModalOpen,
    userExistingAvis,
}) => {
    const { data, setData, post, processing, errors, reset, put } = useForm({
        note: userExistingAvis ? userExistingAvis.note : 0, // Initialisation de la note si un avis existe
        commentaire: userExistingAvis ? userExistingAvis.commentaire : '', // Initialisation du commentaire si un avis existe
    });

    // Function to handle form submission for adding a new avis
    const handleSubmitAvis = async (e) => {
        e.preventDefault();

        if (!data.commentaire || data.note === 0) {
            alert('Veuillez remplir le formulaire correctement.');
            return;
        }

        // Post the form data (in this case, to the server or API)
        post(route('avis.store', vehicule.id), {
            onSuccess: () => {
                reset(); // Reset form fields after submission
                setIsModalOpen(false); // Close the modal after submitting
            },
            onError: (errors) => {
                console.error('Error submitting review:', errors);
                alert('Une erreur est survenue. Veuillez réessayer.');
            },
        });
    };

    const handleSaveEdit = () => {
        if (!data.commentaire || data.note === 0) {
            alert('Veuillez remplir le formulaire correctement.');
            return;
        }

        // Make an API call to update the review
        put(
            `/vehicules/${vehicule.id}/avis/${vehicule.avis.find((avis) => avis.user_id === userId)?.id}`,
            {
                commentaire: data.commentaire,
                note: data.note,
                onSuccess: () => {
                    setIsModalOpen(false); // Close the modal after saving the edit
                },
                onError: (errors) => {
                    console.error('Error updating review:', errors);
                    alert('Une erreur est survenue. Veuillez réessayer.');
                },
            },
        );
    };

    // Reset form when the modal is closed
    const handleCloseModal = () => {
        reset(); // Reset form fields when modal is closed
        setIsModalOpen(false); // Close the modal
    };

    return (
        <Dialog
            open={isModalOpen}
            onClose={handleCloseModal} // Use the custom close handler here
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>
                {vehicule.avis.some((avis) => avis.user_id === userId)
                    ? 'Modifier votre avis'
                    : 'Laisser un avis'}
            </DialogTitle>
            <DialogContent>
                <div className="mt-2">
                    <TextField
                        label="Commentaire"
                        multiline
                        rows={4}
                        value={data.commentaire}
                        onChange={(e) => setData('commentaire', e.target.value)}
                        fullWidth
                        error={Boolean(errors.commentaire)}
                        helperText={errors.commentaire}
                    />
                </div>

                <div className="mt-2">
                    <label className="block text-gray-700">Note</label>
                    <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <button
                                key={value}
                                onClick={() => setData('note', value)}
                                className={`${
                                    data.note >= value
                                        ? 'text-yellow-500'
                                        : 'text-gray-400'
                                } text-2xl`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <PrimaryButton
                    onClick={
                        vehicule.avis.some((avis) => avis.user_id === userId)
                            ? handleSaveEdit
                            : handleSubmitAvis
                    }
                    color="primary"
                    variant="contained"
                    disabled={processing}
                >
                    {processing
                        ? 'Envoi...'
                        : vehicule.avis.some((avis) => avis.user_id === userId)
                          ? 'Sauvegarder'
                          : "Soumettre l'avis"}
                </PrimaryButton>
                <SecondaryButton
                    onClick={handleCloseModal} // Use the custom close handler here
                    color="secondary"
                    isSticky
                >
                    Annuler
                </SecondaryButton>
            </DialogActions>
        </Dialog>
    );
};

export default AvisComponent;
