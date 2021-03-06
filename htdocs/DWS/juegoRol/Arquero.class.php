<?php
ini_set('display_errors',1);
class Arquero extends Unidad{

	protected $armadura;
	protected $arma;

	public function __construct($name, Armadura $armadura = null, Arma $arma = null){
		$this->setArmadura($armadura);
		$this->setArma($arma);
		parent::__construct($name);
	}

	public function ataque(Unidad $oponente){
		echo "<p>$this->nombre dispara una flecha a {$oponente->getNombre()}</p>";
		$oponente->tomaDanyo($this->arma->inflige_danyo());
	}

	public function tomaDanyo($danyo){
		if ($this->armadura) {
			$danyo = $this->armadura->absorve_danyo($danyo);
		}
		return parent::tomaDanyo($danyo);
	}

	public function setArmadura($armadura){
		$this->armadura = $armadura;
	}

	public function setArma($arma){
		$this->arma = $arma;
	}

	public function toString(){
		return "El Arquero llamado ".$this->nombre."<br>";
	}

}

?>