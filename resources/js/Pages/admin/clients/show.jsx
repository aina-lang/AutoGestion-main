import MyHeader from '@/Components/Header';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { Chip } from '@mui/material';
import React from 'react';

function ShowClient({ client }) {
    return (
        <AdminLayout
            header={
                <MyHeader
                    title="Détails du Client"
                    breadcrumbItems={[
                        { label: 'Accueil', href: '/' },
                        { label: 'Clients', href: '/admin/clients' },
                        { label: 'Détails' },
                    ]}
                />
            }
        >
            <Head title={`Détails de ${client.nom}`} />
            <div className="mx-auto max-w-4xl bg-gray-50 p-6">
                <h1 className="mb-8 text-3xl font-semibold text-gray-800">
                    {client.nom} {client.prenoms}
                </h1>
                <div className="space-y-8 rounded-lg border border-gray-200 bg-white p-8 shadow-xl">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <strong className="block text-gray-700">
                                Nom:
                            </strong>
                            <p className="text-lg text-gray-900">
                                {client.nom}
                            </p>
                        </div>
                        <div>
                            <strong className="block text-gray-700">
                                Prénoms:
                            </strong>
                            <p className="text-lg text-gray-900">
                                {client.prenoms}
                            </p>
                        </div>
                        <div>
                            <strong className="block text-gray-700">
                                Email:
                            </strong>
                            <p className="text-lg text-gray-900">
                                {client.email}
                            </p>
                        </div>
                    </div>
                    <div>
                        <strong className="block text-gray-700">
                            Numéros de téléphone:
                        </strong>
                        <div className="mt-4 flex flex-wrap gap-3">
                            {JSON.parse(JSON.parse(client.phones) || '[]').map(
                                (phone, index) => (
                                    <Chip
                                        key={index}
                                        label={phone}
                                        className="bg-blue-100 px-3 py-1 font-medium text-blue-800"
                                    />
                                ),
                            )}
                        </div>
                    </div>
                    <div className="mt-6 flex justify-start space-x-4">
                        <PrimaryButton
                            onClick={() =>
                                router.visit(`/admin/clients/${client.id}/edit`)
                            }
                            variant="contained"
                            color="primary"
                            className="px-6 py-2"
                        >
                            Modifier
                        </PrimaryButton>
                        <SecondaryButton
                            onCLick={() => router.visit('/admin/clients')}
                            variant="outlined"
                            color="secondary"
                            className="px-6 py-2"
                            isSticky
                        >
                            Retour
                        </SecondaryButton>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default ShowClient;
