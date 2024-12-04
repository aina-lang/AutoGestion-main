import BreadCumbHeader from '@/Components/BreadCumbHeader';
import ConfirmModal from '@/Components/ConfirmModal';
import MyHeader from '@/Components/Header';
import PrimaryButton from '@/Components/PrimaryButton';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { TextField } from '@mui/material';
import React from 'react';

function AddCategorie({ categorie }) {
    const { data, setData, post, processing, errors, put } = useForm({
        nom: categorie.nom,

        description: categorie.description,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/categories/${categorie.id}`); // Ajoutez la route pour l'envoi du formulaire
    };

    return (
        <AdminLayout
            breadcrumbHeader={
                <BreadCumbHeader
                    breadcrumbItems={[
                        { label: 'Catégories', href: '/admin/categories/' },
                        { label: 'Modifier un Catégorie' },
                    ]}
                />
            }
            header={
                <MyHeader
                    title="Modifier un Véhicule"
                    breadcrumbItems={[
                        { label: 'Catégories' },
                        { label: 'Modifier une Catégorie' },
                    ]}
                    right={
                        <div className="mx-auto flex w-full justify-start space-y-5 p-6 pt-0">
                            <div className="rounded-lg">
                                <h2 className="mb-2 text-2xl font-bold text-gray-800">
                                    Modification d'une catégorie
                                </h2>
                                <p className="text-gray-600">
                                    Veuillez modifier les informations
                                    nécessaires pour mettre à jour cette
                                    catégorie.
                                </p>
                            </div>
                            {/* 
                        <PrimaryButton
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
