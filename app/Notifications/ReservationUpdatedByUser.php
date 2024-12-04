<?php

namespace App\Notifications;

use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class ReservationUpdatedByUser extends Notification
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
        // Nous envoyons la notification par e-mail ou nous la stockons dans la base de données
        return [
            'mail',

            // <!-- 'database' -->
        ];
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
            ->line('Une réservation a été mise à jour par un utilisateur.')
            ->line('Détails de la réservation :')
            ->line('Véhicule : ' . $this->reservation->vehicule->name)
            ->line('Dates de départ et retour : ' . $this->reservation->date_depart . ' à ' . $this->reservation->date_retour)
            ->action('Voir la Réservation', url('/reservations/' . $this->reservation->id))
            ->line('Merci de vérifier la réservation.');
    }

    /**
     * Envoyer la notification par base de données.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toDatabase($notifiable)
    {
        return [
            'reservation_id' => $this->reservation->id,
            'user_id' => $this->reservation->user_id,
            'vehicule' => $this->reservation->vehicule->name,
            'date_depart' => $this->reservation->date_depart,
            'date_retour' => $this->reservation->date_retour,
            'message' => 'Une réservation a été mise à jour par un utilisateur.',
        ];
    }
}
