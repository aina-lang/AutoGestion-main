import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function SupprimerCompteFormulaire({ className = '' }) {
    const [confirmerSuppressionCompte, setConfirmerSuppressionCompte] =
        useState(false);
    const motDePasseInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmerSuppression = () => {
        setConfirmerSuppressionCompte(true);
    };

    const supprimerCompte = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => fermerModal(),
            onError: () => motDePasseInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const fermerModal = () => {
        setConfirmerSuppressionCompte(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Supprimer le compte
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Une fois votre compte supprimé, toutes ses ressources et
                    données seront définitivement perdues. Avant de procéder,
                    veuillez télécharger toutes les données ou informations que
                    vous souhaitez conserver.
                </p>
            </header>

            <DangerButton onClick={confirmerSuppression}>
                Supprimer le compte
            </DangerButton>

            <Modal show={confirmerSuppressionCompte} onClose={fermerModal}>
                <form onSubmit={supprimerCompte} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Êtes-vous sûr de vouloir supprimer votre compte ?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Une fois votre compte supprimé, toutes ses ressources et
                        données seront définitivement perdues. Veuillez saisir
                        votre mot de passe pour confirmer la suppression
                        définitive de votre compte.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Mot de passe"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={motDePasseInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Mot de passe"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={fermerModal}>
                            Annuler
                        </SecondaryButton>

                        <DangerButton
                            className="ms-3"
                            disabled={processing}
                            type="submit"
                        >
                            Supprimer le compte
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
