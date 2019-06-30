<template>
    <button :style="{ width: buttonWidth }" ><slot></slot></button>
</template>

<script>
export default {
    name: "AppButton",
    props: {
        name: String,
        buttonWidth: String
    }
}
</script>

<style scoped>
    button {
        border-radius: 20px;
        border: none;
        padding-top: 8px;
        padding-bottom: 8px;
        width: auto;
        background-color: white;
        font-family: 'Roboto';
        text-transform: uppercase;
        letter-spacing: 1px;
        color: black;
        transition: all 0.2s ease;
        cursor: pointer;
        outline: none;
        line-height: normal;
    }
    button:hover {
        box-shadow: 0px 0px 15px rgba(255,255,255,0.4);
    }
</style>


