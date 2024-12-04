<?php

namespace App\Notifications;

use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class ReservationUpdatedByAdmin extends Notification
{
    use Queueable;

    protected $reservation;

    /**
     * Créez une nouvelle notification instance.
     *
     * @param  Reservation  $reservation
     * @return void
     */
    public function __construct(Reservation $reservation)
    {
        $this->reservation = $reservation;
    }

    /**
     * Déterminez les canaux de notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail']; // Nous envoyons la notification uniquement par e-mail
    }

    /**
     * Envoyer la notification par e-mail.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Mise à jour de votre réservation') // Sujet de l'email
            ->line('Bonjour ' . $this->reservation->user->name . ',') // Salutation personnalisée avec le nom de l'utilisateur
            ->line('Nous vous informons que votre réservation a été mise à jour par un administrateur.')
            ->line('Voici les détails de la réservation mise à jour :')
            ->line('Véhicule réservé : ' . $this->reservation->vehicule->name) // Détails du véhicule réservé
            ->line('Dates de départ : ' . $this->reservation->date_depart) // Détails sur la date de départ
            ->line('Dates de retour : ' . $this->reservation->date_retour) // Détails sur la date de retour
            ->line('Motif du voyage : ' . $this->reservation->motif) // Motif du voyage
            ->line('Type de voyage : ' . $this->reservation->type_voyage) // Type de voyage (circuit, boucle, transfert, etc.)
            ->action('Voir la Réservation', url('/reservations/' . $this->reservation->id)) // Lien pour voir la réservation mise à jour
            ->line('Si vous avez des questions ou besoin de modifications supplémentaires, n\'hésitez pas à nous contacter.')
            ->line('Merci d\'avoir choisi notre service.');
    }
}
