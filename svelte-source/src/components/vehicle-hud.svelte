<script lang="ts">
  import { faGasPump, faUserSlash } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';
  import { fade } from 'svelte/transition';
  import DebugStore from '../stores/debugStore';
  import VehicleHudStore from '../stores/vehicleHudStore';
  import PartialCircleRing from './hud-shapes/partial-circle-ring.svelte';

  // TODO see if most of these components can be under the same responsive class div, need to test once this is working
</script>

{#if $VehicleHudStore.show || DebugStore}
    <!-- <div class="responsive" id="overlay" style="background-color: #303841; width: 100px; height: 100px; border-radius: 360px; border: solid 3px #415c72">  -->
      <div class="responsive" id="overlay-border"> </div>
      <div class="responsive" id="overlay"> </div>
    <div class="responsive" id="speedometer">
      <PartialCircleRing maxLengthDisplay={100} rotateDegree={212} ringSize={0} progressColor={"white"}
        outlineColor={"black"} outlineColorOpacity={0.6} height={60} width={60} progressValue={$VehicleHudStore.speed}
        text={"MPH"} displayNumber={$VehicleHudStore.speed} maxProgressValue={180}
      />
    </div>
    <div class="responsive" id="fuelgauge">
      <PartialCircleRing maxLengthDisplay={100} rotateDegree={235} ringSize={2.5} progressColor={$VehicleHudStore.fuelColor}
        outlineColor={"#415c72"} outlineColorOpacity={0.6} height={30} width={30} progressValue={$VehicleHudStore.fuel}
        icon={faGasPump} iconColor={"white"} iconScaling={0.32}
      />
    </div>
  
  {#if $VehicleHudStore.showAltitude}
    <div class="responsive" id="altitudegauge">
      <PartialCircleRing maxLengthDisplay={100} rotateDegree={225} ringSize={0} progressColor={"white"}
        outlineColor={"black"} outlineColorOpacity={0.6} height={60} width={60} progressValue={$VehicleHudStore.altitude}
        text={"ALT"} displayNumber={$VehicleHudStore.altitude} maxProgressValue={750}
      />
    </div>
  {/if}

  <!-- When in heli or plane -->
  {#if $VehicleHudStore.showSeatBelt && $VehicleHudStore.showAltitude}
    <div transition:fade|local="{{duration: 500}}">
      <div class="responsive" id="seatbeltAltitude">
        <Fa icon={faUserSlash} scale={1.1} style="color:{$VehicleHudStore.seatbeltColor}"/>
      </div>
    </div>
  <!-- When in car -->
  {:else if $VehicleHudStore.showSeatBelt}
    <div transition:fade|local="{{duration: 500}}">
      <div class="responsive" id="seatbelt">
        <Fa icon={faUserSlash} scale={0.8} style="color:{$VehicleHudStore.seatbeltColor}"/>
      </div>
    </div>
  {/if}
{/if}

<style>
  .responsive {
    position: absolute!important;
  }
  @media (min-width: 800px) {
  .responsive {
    margin-right: 50%!important;
    transform: scale(1, 1);
    bottom: 6.9vh!important;
  }
  #overlay {
    position: relative;
    right: -3.5vh!important;
    bottom: 4vh!important;
  }
  #overlay {
    margin-top: 30px;
    width: 104px;
    height: 60px;
    background-color: #303841;
    border-color: #303841;
    position: relative;
    display: inline-block;
  }
  #overlay:before {
    content: " ";
    width: 0; height: 0;
    border-bottom: 30px solid;
    border-color: inherit;
    border-left: 52px solid transparent;
    border-right: 52px solid transparent;
    position: absolute;
    top: -30px;
  }
  #overlay:after {
    content: "";
    width: 0;
    position: absolute;
    bottom: -30px;
    border-top: 30px solid;
    border-color: inherit;
    border-left: 52px solid transparent;
    border-right: 52px solid transparent;
  }
  /* #overlay-border {
    position: relative;
    right: -3.5vh!important;
    bottom: 4vh!important;
  }
  #overlay-border {
    margin-top: 30px;
    width: 104px;
    height: 60px;
    background-color: #415c72;
    border-color: #415c72;
    position: relative;
    display: inline-block;
    transform: scale(1.04);
  }
  #overlay-border:before {
    content: " ";
    width: 0; height: 0;
    border-bottom: 30px solid;
    border-color: inherit;
    border-left: 52px solid transparent;
    border-right: 52px solid transparent;
    position: absolute;
    top: -30px;
  }
  #overlay-border:after {
    content: "";
    width: 0;
    position: absolute;
    bottom: -30px;
    border-top: 30px solid;
    border-color: inherit;
    border-left: 52px solid transparent;
    border-right: 52px solid transparent;
  } */
  #speedometer {
    position: relative;
    right: -1.1vh!important;
    bottom: 5vh!important;
  }
  #fuelgauge {
    position: relative;
    right: 0.5vh!important;
    bottom: 2.7vh!important;
  }
  #altitudegauge {
    position: relative;
    right: -8.3vh!important;
    bottom: 0.5vh!important;
  }
  #seatbelt {
    position: relative;
    right: 4.2vh!important;
    bottom: 6.2vh!important;
  }
}

@media (width: 3840px) and (height: 2160px) {
  .responsive {
    margin-left: 32.8vh!important;
    transform: scale(1.3, 1.3);
    bottom: 7.6vh!important;
  }
  #speedometer {
    position: relative;
    left: 2.5vh!important;
  }
  #fuelgauge {
    position: relative;
    left: 5.3vh!important;
    bottom: 7.1vh!important;
  }
  #altitudegauge {
    position: relative;
    left: 8.2vh!important;
  }
  #seatbelt {
    position: relative;
    left: 6.5vh!important;
  }
}

@media (width: 3440px) and (height: 1440px) {
  .responsive {
    margin-left: 33vh!important;
    transform: scale(1.3, 1.3);
    bottom: 7.6vh!important;
  }
  #speedometer {
    position: relative;
    left: 2.5vh!important;
  }
  #fuelgauge {
    position: relative;
    left: 6.4vh!important;
    bottom: 6.85vh!important;
  }
  #altitudegauge {
    position: relative;
    left: 11.2vh!important;
  }
  #seatbelt {
    position: relative;
    left: 8.8vh!important;
  }
}

@media (width: 2560px) and (height: 1440px) {
  .responsive {
    margin-left: 33.5vh!important;
    transform: scale(1.3, 1.3);
    bottom: 7.2vh!important;
  }
  #speedometer {
    position: relative;
    left: 0vw!important;
  }
  #fuelgauge {
    position: relative;
    left: 2.0vw!important;
    bottom: 6.0vh!important;
  }
  #altitudegauge {
    position: relative;
    left: 4vw!important;
  }
  #seatbelt {
    position: relative;
    left: 4.1vw!important;
    bottom: 8.5vh!important;
  }
  #seatbeltAltitude {
    position: relative;
    left: 2.8vw!important;
    bottom: 12vh!important;
  }
}

@media (width: 2560px) and (height: 1080px) {
    .responsive {
        margin-left: 33.5vh !important;
        transform: scale(1.3);
        bottom: 7.2vh !important;
    }
    #speedometer {
        position: relative;
        left: 0vw !important;
    }
    #fuelgauge {
        position: relative;
        left: 2vw !important;
        bottom: 5.95vh !important;
    }
    #altitudegauge {
        position: relative;
        left: 4vw !important;
    }
    #seatbelt {
        position: relative;
        left: 4.1vw !important;
        bottom: 8.5vh !important;
    }
    #seatbeltAltitude {
        position: relative;
        left: 2.8vw !important;
        bottom: 12vh !important;
    }
}

@media (width: 1920px) and (height: 1440px) {
  .responsive {
    margin-right: 12.4vw!important;
    transform: scale(1.2, 1.2);
    bottom: 6.8vh!important;
  }
  #speedometer {
    position: relative;
    right: 2.5vh!important;
  }
  #fuelgauge {
    position: relative;
    right: 4.6vw!important;
    bottom: 5.9vh!important;
  }
  #altitudegauge {
    position: relative;
    right: 7.2vw!important;
  }
  #seatbelt {
    position: relative;
    right: 7.5vw!important;
  }
  #seatbeltAltitude {
    position: relative;
    right: 5.5vw!important;
    bottom: 11vh!important;
  }
}

@media (width: 1920px) and (height: 1200px) {
  .responsive {
    margin-left: 18.5vw!important;
    transform: scale(1, 1);
    bottom: 6.4vh!important;
  }
  #speedometer {
    position: relative;
    left: 2.5vh!important;
  }
  #fuelgauge {
    position: relative;
    left: 3.9vw!important;
    bottom: 5.65vh!important;
  }
  #altitudegauge {
    position: relative;
    left: 5.8vw!important;
  }
  #seatbelt {
    position: relative;
    left: 6.5vw!important;
  }
  #seatbeltAltitude {
    position: relative;
    left: 4.75vw!important;
    bottom: 11vh!important;
  }
}

@media (width: 1920px) and (height: 1080px) {
  .responsive {
    margin-right: 50%!important;
    transform: scale(1, 1);
    bottom: 6.9vh!important;
  }
  #overlay {
    position: relative;
    right: -3.5vh!important;
    bottom: 4vh!important;
  }
  #overlay {
    margin-top: 30px;
    width: 104px;
    height: 60px;
    background-color: #3038415d;
    border-color: #3038415d;
    position: relative;
    display: inline-block;
  }
  #overlay:before {
    content: " ";
    width: 0; height: 0;
    border-bottom: 31px solid;
    border-color: inherit;
    border-left: 52px solid transparent;
    border-right: 52px solid transparent;
    position: absolute;
    top: -30px;
  }
  #overlay:after {
    content: "";
    width: 0;
    position: absolute;
    bottom: -30px;
    border-top: 30px solid;
    border-color: inherit;
    border-left: 52px solid transparent;
    border-right: 52px solid transparent;
  }
  /* #overlay-border {
    position: relative;
    right: -3.5vh!important;
    bottom: 4vh!important;
  } */
  /* #overlay-border {
    margin-top: 30px;
    width: 104px;
    height: 60px;
    background-color: #3038415d;
    border-color: #3038415d;
    position: relative;
    display: inline-block;
    transform: scale(1.04);
  }
  #overlay-border:before {
    content: " ";
    width: 0; height: 0;
    border-bottom: 30px solid;
    border-color: inherit;
    border-left: 52px solid transparent;
    border-right: 52px solid transparent;
    position: absolute;
    top: -30px;
  }
  #overlay-border:after {
    content: "";
    width: 0;
    position: absolute;
    bottom: -30px;
    border-top: 30px solid;
    border-color: inherit;
    border-left: 52px solid transparent;
    border-right: 52px solid transparent;
  } */
  #speedometer {
    position: relative;
    right: -1.5vh!important;
    bottom: 4.5vh!important;
  }
  #fuelgauge {
    position: relative;
    right: -0.1vh!important;
    bottom: 2.7vh!important;
  }
  #altitudegauge {
    position: relative;
    right: -8.3vh!important;
    bottom: 0.5vh!important;
  }
  #seatbelt {
    position: relative;
    right: 4.2vh!important;
    bottom: 6.2vh!important;
  }
}

@media (width: 1280px) and (height: 720px) {
  .responsive {
    margin-left: 30vh!important;
    transform: scale(1, 1);
    bottom: 5.8vh!important;
  }
  #speedometer {
    position: relative;
    left: 2.5vh!important;
  }
  #fuelgauge {
    position: relative;
    left: 4.8vw!important;
    bottom: 4.7vh!important;
  }
  #altitudegauge {
    position: relative;
    left: 7.5vw!important;
  }
  #seatbelt {
    position: relative;
    left: 7.7vw!important;
  }
  #seatbeltAltitude {
    position: relative;
    left: 5.9vw!important;
    bottom: 13vh!important;
  }
}
</style>