<?php
ini_set('display_errors',1);
abstract class Unidad {

    protected $puntos = 40;
    protected $nombre;

    public function __construct($nombre){
        $this->nombre = $nombre;
    }

    abstract public function ataque(Unidad $oponente);

    public function mueve($direction){
        echo "<p>$this->nombre avanza hacia $direction</p>";
    }

    public function muere(){
        echo "<p>$this->nombre muere</p>";
        exit();
    }

    public function tomaDanyo($danyo){
        $this->puntos = $this->puntos - $danyo;
        echo "<p>$this->nombre tiene ahora $this->puntos de vida</p>";
        if ($this->puntos <= 0) {
            $this->muere();
        }
    }

    public function getNombre(){
        return $this->nombre;
    }
}

?>