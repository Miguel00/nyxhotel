<template>
	<div class="container-fluid bg-image" style="min-height: 1000px;padding-top: 10rem;">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-6 text-center" v-if="!resCanceled">
					<h2 class="text-white mb-4">{{$t('¿Estas seguro que deseas cancelar tu reserva?')}}</h2>
					<button class="btn btn-danger btn-block text-uppercase" :disabled="loading" @click="submit">
						<span
							v-if="loading"
							class="spinner-border spinner-border-sm"
						></span>

						{{$t('Cancelar reserva')}}
					</button>
				</div>
				<div class="col-6 text-center" v-else>
					<h2 class="text-white mb-4">{{$t('Reserva cancelada con éxito')}}</h2>
				</div>
			</div>
		</div>
	</div>
</template>

<script >
	import UserService from "../services/user.service";
	export default {
		data(){
			return {
				loading : false,
				resCanceled : false,
			}
		},
		methods : {
			submit(){
				this.loading = true
				UserService.cancelRes(this.$route.params.id).then(() => {
					this.resCanceled = true
				})
			}
		}
	}
</script>

<style scoped>
	.bg-image{background-image: url('../assets/imgdesktop.png');background-size: 100% 100%;height: 100%;}
</style>