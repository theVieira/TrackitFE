export function Translate(text: string) {
	switch (text) {
		case 'Daily':
			return 'Diário'
		case 'Delivery':
			return 'Entrega'
		case 'Budget':
			return 'Orçamento'
		case 'Maintenance':
			return 'Manutenção'
		case 'Low':
			return 'Baixa'
		case 'Medium':
			return 'Média'
		case 'Normal':
			return 'Normal'
		case 'High':
			return 'Alta'
		case 'Urgent':
			return 'Urgente'
		case 'Open':
			return 'Aberto'
		case 'Progress':
			return 'Progresso'
		case 'Finish':
			return 'Finalizado'
		case 'NetworkFailure':
			return 'Falha na rede'
		case 'HardwareFailure':
			return 'Falha no hardware'
		case 'SoftwareFailure':
			return 'Falha no software'
		case 'RemoteAccess':
			return 'Acesso remoto'
		case 'Documentation':
			return 'Documentação'
		case 'PeriodicMaintenance':
			return 'Manutenção periódica'
		case 'Critical':
			return 'Crítico'
		case 'VIP':
			return 'VIP'
		case 'TestDrive':
			return 'Teste drive'
		case 'Regular':
			return 'Regular'
		case 'Inactive':
			return 'Inativo'
		default:
			break
	}
}
