#!/bin/bash

# Script dinámico para configurar tópicos de Kafka
echo "🚀 Configurando Kafka..."

# Configuración global
KAFKA_CONTAINER="kafka"
BOOTSTRAP_SERVER="localhost:9092"
REPLICATION_FACTOR=1

# Lista de tópicos con sus configuraciones
# Formato: "nombre_topico:particiones:descripcion"
TOPICS=(
  "registration-events:5:Registros-module"
  "schedule-events:5:schedule-module"
  "student-events:5:student-module"
  "study-plan-events:5:study-module"
  "teacher-events:5:teacher-module"
)

# Función para verificar si Kafka está listo
check_kafka_ready() {
  echo "⏳ Verificando que Kafka esté listo..."
  local max_attempts=30
  local attempt=1

  while [ $attempt -le $max_attempts ]; do
    if docker exec $KAFKA_CONTAINER kafka-broker-api-versions --bootstrap-server $BOOTSTRAP_SERVER >/dev/null 2>&1; then
      echo "✅ Kafka está listo!"
      return 0
    fi
    echo "   Intento $attempt/$max_attempts - Esperando..."
    sleep 2
    ((attempt++))
  done

  echo "❌ Error: Kafka no está disponible después de $max_attempts intentos"
  exit 1
}

# Función para crear un tópico
create_topic() {
  local topic_name=$1
  local partitions=$2
  local description=$3

  echo "📝 Creando tópico '$topic_name' ($description) con $partitions particiones..."

  if docker exec $KAFKA_CONTAINER kafka-topics --create \
    --topic "$topic_name" \
    --bootstrap-server $BOOTSTRAP_SERVER \
    --replication-factor $REPLICATION_FACTOR \
    --partitions $partitions \
    --if-not-exists >/dev/null 2>&1; then
    echo "   ✅ Tópico '$topic_name' creado exitosamente"
  else
    echo "   ⚠️  El tópico '$topic_name' ya existe o hubo un error"
  fi
}

# Función para listar tópicos existentes
list_existing_topics() {
  echo "📋 Verificando tópicos existentes..."
  docker exec $KAFKA_CONTAINER kafka-topics --list --bootstrap-server $BOOTSTRAP_SERVER 2>/dev/null
}

# Función para mostrar detalles de los tópicos
show_topic_details() {
  echo "🔍 Detalles de los tópicos creados:"
  for topic_config in "${TOPICS[@]}"; do
    IFS=':' read -r topic_name partitions description <<<"$topic_config"

    echo "  📌 $topic_name:"
    docker exec $KAFKA_CONTAINER kafka-topics --describe \
      --topic "$topic_name" \
      --bootstrap-server $BOOTSTRAP_SERVER 2>/dev/null | grep -E "(Topic:|Partition:|Leader:|Replicas:|Isr:)" | sed 's/^/     /'
    echo
  done
}

# Función principal
main() {
  # Verificar que Kafka esté listo
  check_kafka_ready

  echo
  echo "📊 Configuración a crear:"
  printf "%-25s %-12s %s\n" "TÓPICO" "PARTICIONES" "DESCRIPCIÓN"
  printf "%-25s %-12s %s\n" "======" "===========" "==========="
  for topic_config in "${TOPICS[@]}"; do
    IFS=':' read -r topic_name partitions description <<<"$topic_config"
    printf "%-25s %-12s %s\n" "$topic_name" "$partitions" "$description"
  done
  echo

  # Crear cada tópico
  echo "🔨 Creando tópicos..."
  for topic_config in "${TOPICS[@]}"; do
    IFS=':' read -r topic_name partitions description <<<"$topic_config"
    create_topic "$topic_name" "$partitions" "$description"
  done

  echo

  # Mostrar tópicos existentes
  echo "📋 Todos los tópicos en el cluster:"
  list_existing_topics

  echo

  # Mostrar detalles (opcional, comentar si no se necesita)
  # show_topic_details

  echo "✅ Configuración de Kafka completada!"
  echo
  echo "🔗 Enlaces útiles:"
  echo "   Kafka UI: http://localhost:8081"
  echo "   Kafka Broker: $BOOTSTRAP_SERVER"
  echo
  echo "💡 Para agregar más tópicos, modifica el array TOPICS en este script"
}

# Ejecutar función principal
main
