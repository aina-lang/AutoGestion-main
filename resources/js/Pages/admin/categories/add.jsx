import BreadCumbHeader from '@/Components/BreadCumbHeader';
import ConfirmModal from '@/Components/ConfirmModal';
import MyHeader from '@/Components/Header';
import PrimaryButton from '@/Components/PrimaryButton';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { TextField } from '@mui/material';
import React from 'react';

function AddCategorie({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        nom: '',

        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/categories/'); // Ajoutez la route pour l'envoi du formulaire
    };

    const handleRemoveImage = (index) => {
        setImagePreviews((prevImages) =>
            prevImages.filter((_, i) => i !== index),
        );
    };

    return (
        <AdminLayout
            breadcrumbHeader={
                <BreadCumbHeader
                    breadcrumbItems={[
                        { label: 'Véhicules', href: '/admin/vehicules/' },
                        { label: 'Catégories', href: '/admin/categories/' },
                        { label: 'Ajouter un Catégorie' },
                    ]}
                />
            }
            header={
                <MyHeader
                    title="Ajouter un Véhicule"
                    breadcrumbItems={[
                        { label: 'Accueil', href: '/' },
                        { label: 'Véhicules' },
                        { label: 'Ajouter un Véhicule' },
                    ]}
                    right={
                        <div className="flex space-x-4 py-5">
                            {/* <PrimaryButton
                                onClick={() => router.get('/vehicules')}
                            >
                                <GridAddIcon />
                                Retour aux Véhicules
                            </PrimaryButton> */}
                        </div>
                    }
                />
            }
        >
            <Head title="Ajouter un Véhicule" />
            <div className="mx-auto space-y-5 p-6 pt-0">
                <div className="rounded-lg">
                    <h2 className="mb-2 text-2xl font-bold text-gray-800">
                        Ajout d'une catégorie de véhicule
                    </h2>
                    <p className="text-gray-600">
                        Veuillez remplir les informations nécessaires pour
                        ajouter une nouvelle catégorie de véhicule.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="">
                    <div className="mb-4 grid gap-4 rounded-md bg-white p-5 shadow-lg">
                        <TextField
                            label="Nom"
                            value={data.nom}
                            onChange={(e) => setData('nom', e.target.value)}
                            error={!!errors.nom}
                            helperText={errors.nom}
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            label="Description"
                            multiline
                            rows={4}
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            error={!!errors.description}
                            helperText={errors.description}
                            fullWidth
                            variant="outlined"
                        />
                    </div>

                    <div className="mt-6">
                        <PrimaryButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={processing}
                            fullWidth
                            className="bg-indigo-600 text-white hover:bg-indigo-700"
                        >
                            Ajouter le Véhicule
                        </PrimaryButton>
                    </div>
                </form>
            </div>

            <ConfirmModal
                open={false} // Modifier selon votre logique d'ouverture
                onClose={() => {}}
                onConfirm={() => {}}
                title="Confirmer l'ajout"
                content="Êtes-vous sûr de vouloir ajouter ce véhicule ?"
            />
        </AdminLayout>
    );
}

export default AddCategorie;
